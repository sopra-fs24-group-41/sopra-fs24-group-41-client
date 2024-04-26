import React, { useEffect, useState, createContext } from "react";
import BaseContainer from "components/ui/BaseContainer";
import "styles/views/Game.scss";
import WordBoard from "./WordBoard";
import WordMergeBar from "./WordMergeBar";
import Player from "models/Player";
import { api, handleError } from "helpers/api";
import Word from "models/Word";
import PlayerList from "./PlayerList";
import TargetWord from "./TargetWord";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

export const nextWordIndexContext = createContext(123);

export const mergeWordListContext = createContext([]);

export const wordListContext = createContext([]);

export const playerContext = createContext(new Player());

const Game = ({ stompWebSocketHook }) => {
    const [nextWordIndex, setNextWordIndex] = useState(0);
    const [mergeWordList, setMergeWordList] = useState<String>([]);
    const [player, setPlayer] = useState<Player>(new Player);
    const [players, setPlayers] = useState<Player[]>([]);
    const [wordList, setWordList] = useState<Word[]>([]);
    const navigate = useNavigate();
    const playerId = localStorage.getItem("playerId");
    const playerToken = localStorage.getItem("playerToken");
    const lobbyCode = localStorage.getItem("lobbyCode");

    useEffect(() => {
        const fetchPlayer = async () => {
            try {
                let response = await api.get(`/lobbies/${lobbyCode}/players/${playerId}`, { headers: { "playerToken": playerToken } });
                let foundPlayer = new Player(response.data);
                foundPlayer.id = playerId;
                foundPlayer.token = playerToken;
                foundPlayer.lobbyCode = lobbyCode;
                setPlayer(foundPlayer);
            } catch (error) {
                handleError(error, navigate);
            }
        };

        const fetchOtherPlayers = async () => {
            try {
                let response = await api.get(`/lobbies/${lobbyCode}/players`,);
                setPlayers(response.data.map(p => new Player(p)));
            } catch (error) {
                handleError(error, navigate);
            }
        };

        fetchPlayer();
        fetchOtherPlayers();
    }, []);

    useEffect(() => {
        if (stompWebSocketHook.connected === true) {
            stompWebSocketHook.subscribe(`/topic/lobbies/${lobbyCode}/game`);
        }

        return () => {
            if (stompWebSocketHook.connected === true) {
                stompWebSocketHook.unsubscribe(`/topic/lobbies/${lobbyCode}/game`);
            }
            stompWebSocketHook.resetMessagesList();
        };
    }, [stompWebSocketHook.connected]);

    useEffect(() => {
        setWordList(player?.getWords());
    }, [player]);

    useEffect(() => {
        let messagesLength = stompWebSocketHook.messages.length;
        if (messagesLength > 0 && stompWebSocketHook.messages[messagesLength - 1] !== undefined) {
            const newObject = stompWebSocketHook.messages[messagesLength - 1];
            if (newObject.instruction && newObject.instruction === "stop") {
                navigate("/result/");
            }
        }
    }, [stompWebSocketHook.messages]);

    return (
        <div>
            <nextWordIndexContext.Provider value={{ nextWordIndex, setNextWordIndex }}>
                <mergeWordListContext.Provider value={{ mergeWordList, setMergeWordList }}>
                    <wordListContext.Provider value={{ wordList, setWordList }}>
                        <playerContext.Provider value={{ player, setPlayer }}>    
                            <BaseContainer>
                                <TargetWord></TargetWord>
                            </BaseContainer>
                            <BaseContainer className="game base-container">

                                <div className="game horizontal-container">
                                    <div className="game container">
                                        <WordMergeBar></WordMergeBar>
                                        <WordBoard></WordBoard>
                                    </div>
                                    <PlayerList players={players}></PlayerList>
                                </div>
                            </BaseContainer>
                        </playerContext.Provider>
                    </wordListContext.Provider>
                </mergeWordListContext.Provider>
            </nextWordIndexContext.Provider>
        </div>
    );
};

Game.propTypes = {
    stompWebSocketHook: PropTypes.shape({
        subscribe: PropTypes.func.isRequired,
        unsubscribe: PropTypes.func.isRequired,
        sendMessage: PropTypes.func.isRequired,
        messages: PropTypes.array.isRequired,
        resetMessagesList: PropTypes.func.isRequired,
        connected: PropTypes.bool.isRequired,
        subscriptionsRef: PropTypes.object.isRequired,
    }).isRequired,
};

export default Game;
