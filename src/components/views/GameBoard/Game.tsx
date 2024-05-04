import React, { useEffect, useState, createContext } from "react";
import { useNavigate } from "react-router-dom";
import BaseContainer from "components/ui/BaseContainer";
import TargetWord from "./TargetWord";
import WordBoard from "./WordBoard";
import PlayerList from "./PlayerList";
import { api, handleError } from "helpers/api";
import Player from "models/Player";
import PlayerWord from "models/PlayerWord";
import PropTypes from "prop-types";
import "styles/views/Game.scss";

export const playerContext = createContext(new Player());

const Game = ({ stompWebSocketHook }) => {
    const [player, setPlayer] = useState<Player>(new Player());
    const playerId = localStorage.getItem("playerId");
    const playerToken = localStorage.getItem("playerToken");
    const lobbyCode = localStorage.getItem("lobbyCode");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPlayer = async () => {
            try {
                let response = await api.get(`/lobbies/${lobbyCode}/players/${playerId}`, { headers: { "playerToken": playerToken } });
                let foundPlayer = new Player(response.data);
                foundPlayer.id = playerId;
                foundPlayer.token = playerToken;
                foundPlayer.lobbyCode = lobbyCode;
                foundPlayer.sortPlayerWords();
                setPlayer(foundPlayer);
            } catch (error) {
                handleError(error, navigate);
            }
        };

        fetchPlayer();
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
        let messagesLength = stompWebSocketHook.messages.length;
        if (messagesLength > 0 && stompWebSocketHook.messages[messagesLength - 1] !== undefined) {
            const newObject = stompWebSocketHook.messages[messagesLength - 1];
            if (newObject.instruction && newObject.instruction === "stop") {
                navigate("/result/");
            }
        }
    }, [stompWebSocketHook.messages]);

    const play = async (playerWord1: PlayerWord, playerWord2: PlayerWord) => {
        try {
            let response = await api.put(
                `/lobbies/${lobbyCode}/players/${playerId}`,
                [playerWord1.word, playerWord2.word],
                { headers: { playerToken: playerToken } }
            );
            let responsePlayer = new Player(player);
            responsePlayer.points = response.data.points;
            responsePlayer.playerWords = response.data.playerWords;
            responsePlayer.sortPlayerWords();
            responsePlayer.targetWord = response.data.targetWord;
            let resultPlayerWord = new PlayerWord();
            resultPlayerWord.word = response.data.resultWord;

            setPlayer(responsePlayer);

            return resultPlayerWord;
        } catch (error) {
            handleError(error, navigate);
        }
    };

    return (
        <div>
            <playerContext.Provider value={{ player, setPlayer }}>
                <BaseContainer>
                    <TargetWord></TargetWord>
                </BaseContainer>
                <BaseContainer className="game base-container">
                    <div className="game horizontal-container">
                        <WordBoard playFunction={play} ></WordBoard>
                        <PlayerList></PlayerList>
                    </div>
                </BaseContainer>
            </playerContext.Provider>
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
