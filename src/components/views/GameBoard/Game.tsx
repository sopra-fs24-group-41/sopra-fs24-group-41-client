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
import {Button} from "../../ui/Button";
import QuitPopup from "../../popup-ui/QuitPopup";
import Typewriter from "../Explanations/Typewriter";

export const playerContext = createContext(new Player());

export const otherPlayersContext = createContext([]);

export const GameContext = createContext();

const Game = ({ stompWebSocketHook }) => {
    const [player, setPlayer] = useState<Player>(new Player());
    const [otherPlayers, setOtherPlayers] = useState<Player[]>([]);
    const playerId = localStorage.getItem("playerId");
    const playerToken = localStorage.getItem("playerToken");
    const lobbyCode = localStorage.getItem("lobbyCode");
    const navigate = useNavigate();
    const [quitPopup, setQuitPopup] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [remainingTime, setRemainingTime] = useState(" ");


    const popupMessages = {
        "30": "You have 30 seconds left!",
        "10": "You have 10 seconds  left!",
        "60": "You have 1 minute left!",
        "180": "You have 3 minutes left!",
        "300": "You have 5 minutes left!",
    };


    const fetchPlayer = async () => {
        try {
            let response = await api.get(
                `/lobbies/${lobbyCode}/players/${playerId}`,
                { headers: { playerToken: playerToken } }
            );
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

    const fetchOtherPlayers = async () => {
        try {
            let response = await api.get(`/lobbies/${lobbyCode}/players`);
            let foundOtherPlayers = response.data.map((p) => new Player(p));
            foundOtherPlayers.sort((a, b) => b.points - a.points);
            setOtherPlayers(foundOtherPlayers);
        } catch (error) {
            handleError(error, navigate);
        }
    };

    const renderPopupMessage = (TimeMSG) => {
        if (TimeMSG) {
            setRemainingTime(TimeMSG);
            setTimeout(() => setRemainingTime(" "), 2000);
        }
    };

    useEffect(() => {
        fetchPlayer();
        fetchOtherPlayers();
    }, []);

    useEffect(() => {
        if (stompWebSocketHook.connected === true) {
            stompWebSocketHook.subscribe(`/topic/lobbies/${lobbyCode}/game`);
        }

        return () => {
            if (stompWebSocketHook.connected === true) {
                stompWebSocketHook.unsubscribe(
                    `/topic/lobbies/${lobbyCode}/game`
                );
            }
            stompWebSocketHook.resetMessagesList();
        };
    }, [stompWebSocketHook.connected]);

    useEffect(() => {
        let messagesLength = stompWebSocketHook.messages.length;
        if (
            messagesLength > 0 &&
            stompWebSocketHook.messages[messagesLength - 1] !== undefined
        ) {
            const newObject = stompWebSocketHook.messages[messagesLength - 1];
            if (newObject.instruction && newObject.instruction === "stop") {
                navigate("/result/");
            }

            if (newObject.time) {
                renderPopupMessage(popupMessages[newObject.time]);
            }

            if (newObject.instruction === "kick") {
                kick();
            }

            if (newObject.instruction === "update") {
                fetchOtherPlayers();
            }
        }
    }, [stompWebSocketHook.messages]);

    const kick = () => {
        localStorage.removeItem("playerId");
        localStorage.removeItem("playerToken");
        localStorage.removeItem("lobbyCode");
        navigate("/lobbyoverview");
    };

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
            responsePlayer.status = response.data.status;
            setPlayer(responsePlayer);

            return resultPlayerWord;
        } catch (error) {
            handleError(error, navigate);
        }
    };

    const handleQuit = () => {
        setQuitPopup((prevState) => !prevState);
    };

    return (
        <div>
            <Typewriter text={remainingTime}/>
            <BaseContainer className="game vertical-container">
                <playerContext.Provider value={{ player, setPlayer }}>
                    <BaseContainer className="game container">
                        <BaseContainer className="game horizontal-container">
                            <TargetWord></TargetWord>
                            <Button onClick={() => handleQuit()}>Quit</Button>
                            {quitPopup && (
                                <GameContext.Provider
                                    value={{ quitPopup, setQuitPopup }}
                                >
                                    <QuitPopup />
                                </GameContext.Provider>
                            )}
                        </BaseContainer>
                    </BaseContainer>
                    <BaseContainer className="game horizontal-container">
                        <BaseContainer className="game container">
                            <WordBoard playFunction={play}></WordBoard>
                        </BaseContainer>
                        <BaseContainer className="player-list container">
                            <otherPlayersContext.Provider
                                value={{ otherPlayers, setOtherPlayers }}
                            >
                                <PlayerList></PlayerList>
                            </otherPlayersContext.Provider>
                        </BaseContainer>
                    </BaseContainer>
                </playerContext.Provider>
            </BaseContainer>
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
