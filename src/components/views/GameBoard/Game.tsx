import React, { useEffect, useState, createContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import BaseContainer from "components/ui/BaseContainer";
import TargetWord from "./TargetWord";
import WordBoard from "./WordBoard";
import PlayerList from "./PlayerList";
import { api, useError } from "helpers/api";
import Player from "models/Player";
import PlayerWord from "models/PlayerWord";
import PropTypes from "prop-types";
import "styles/views/Game.scss";
import { Button } from "../../ui/Button";
import QuitPopup from "../../popup-ui/QuitPopup";
import AbortGamePopup from "../../popup-ui/AbortGamePopup";
import Typewriter from "../../popup-ui/Typewriter";
import { RotateSpinner } from "components/ui/RotateSpinner";
import Achievement from "models/Achievement";

export const playerContext = createContext(new Player());

export const otherPlayersContext = createContext([]);

export const GameContext = createContext();

const Game = ({ stompWebSocketHook }) => {
    const [player, setPlayer] = useState<Player>(new Player());
    const [otherPlayers, setOtherPlayers] = useState<Player[]>([]);
    const [isLobbyOwner, setIsLobbyOwner] = useState<boolean>(false);
    const playerId = Number(localStorage.getItem("playerId"));
    const playerToken = localStorage.getItem("playerToken");
    const lobbyCode = localStorage.getItem("lobbyCode");
    const navigate = useNavigate();
    const [quitPopup, setQuitPopup] = useState(false);
    const [abortGamePopup, setAbortGamePopup] = useState(false);
    const [remainingTime, setRemainingTime] = useState(" ");
    const [isLoading, setIsLoading] = useState(false);
    const [achievementPopup, setAchievementPopup] = useState(false);
    const [achievementMsg, setAchievementMsg] = useState(null);
    const [popupClass, setPopupClass] = useState("");
    const playerValue = useMemo(
        () => ({ player, setPlayer }),
        [player, setPlayer]
    );
    const quitPopupValue = useMemo(
        () => ({ quitPopup, setQuitPopup }),
        [quitPopup, setQuitPopup]
    );
    const otherPlayersValue = useMemo(
        () => ({ otherPlayers, setOtherPlayers }),
        [otherPlayers, setOtherPlayers]
    );

    const abortGameValue = useMemo(
        () => ({ abortGamePopup, setAbortGamePopup }),
        [abortGamePopup, setAbortGamePopup]
    );

    const { handleError } = useError();

    const popupMessages = {
        "30": "You have 30 seconds left!",
        "10": "You have 10 seconds left!",
        "60": "You have 1 minute left!",
        "180": "You have 3 minutes left!",
        "300": "You have 5 minutes left!",
    };

    const fetchPlayer = async () => {
        if (!lobbyCode) {
            navigate("/lobbyoverview");
        }
        try {
            let response = await api.get(
                `/lobbies/${lobbyCode}/players/${playerId}`,
                { headers: { playerToken: playerToken } }
            );
            let foundPlayer = new Player(response.data);
            foundPlayer.sortPlayerWords();
            setPlayer(foundPlayer);
        } catch (error) {
            handleError(error, navigate);
        }
    };

    const fetchOtherPlayers = async () => {
        if (!lobbyCode) {
            navigate("/lobbyoverview");
        }
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

    const [achievementQueue, setAchievementQueue] = useState([]);
    const [processingAchievement, setProcessingAchievement] = useState(false);

    const enqueueAchievement = (name) => {
        setAchievementQueue((prevQueue) => [...prevQueue, name]);
    };

    const processQueue = () => {
        setProcessingAchievement(true);
        const achievement = achievementQueue[0];
        setAchievementQueue((prevQueue) => prevQueue.slice(1));
        setAchievementMsg(achievement);
        setAchievementPopup(true);
        setPopupClass("show");
        setTimeout(() => {
            setPopupClass("hide");
            setTimeout(() => {
                setAchievementPopup(false);
                setProcessingAchievement(false);
            }, 1000); // Wait for hide animation to complete
        }, 3000); // Display message for 3 seconds
    };

    useEffect(() => {
        if (achievementQueue.length !== 0 && processingAchievement === false) {
            processQueue();
        }
    }, [achievementQueue, processingAchievement]);

    useEffect(() => {
        fetchPlayer();
        fetchOtherPlayers();
        lobbyOwner();
    }, []);

    // websocket subscription
    useEffect(() => {
        if (stompWebSocketHook.connected.current === true) {
            stompWebSocketHook.subscribe(`/topic/lobbies/${lobbyCode}/game`);
            stompWebSocketHook.subscribe(
                `/topic/achievements/${localStorage.getItem("userId")}`
            );
        }

        return () => {
            if (stompWebSocketHook.connected.current === true) {
                stompWebSocketHook.unsubscribe(
                    `/topic/lobbies/${lobbyCode}/game`
                );
                stompWebSocketHook.unsubscribe(
                    `/topic/achievements/${localStorage.getItem("userId")}`
                );
            }
            stompWebSocketHook.resetMessagesList();
        };
    }, [stompWebSocketHook.connectedTrigger]);

    // websocket message interpretation
    useEffect(() => {
        let messagesLength = stompWebSocketHook.messages.length;
        if (messagesLength > 0) {
            const messagesList = stompWebSocketHook.messages;
            messagesList.forEach((message) => {
                if (message.instruction === "stop") {
                    navigate("/result/");
                }

                if (message.instruction === "abort_game") {
                    navigate("/lobbies/" + lobbyCode);
                }

                if (message.instruction === "update_timer") {
                    renderPopupMessage(popupMessages[message.data.time]);
                }

                if (message.instruction === "achievement") {
                    let receivedAchievement = new Achievement(message.data);
                    enqueueAchievement(receivedAchievement.title);
                }

                if (message.instruction === "kick") {
                    console.log("kicked because: ", message.reason); // replace with showing message
                    kick();
                }

                if (message.instruction === "update_players") {
                    let foundOtherPlayers = message.data.map(
                        (p) => new Player(p)
                    );
                    foundOtherPlayers.sort((a, b) => b.points - a.points);
                    setOtherPlayers(foundOtherPlayers);
                }
            });
            stompWebSocketHook.resetMessagesList();
        }
    }, [stompWebSocketHook.messages]);

    const kick = () => {
        localStorage.removeItem("playerId");
        localStorage.removeItem("playerToken");
        localStorage.removeItem("lobbyCode");
        navigate("/lobbyoverview");
    };

    const lobbyOwner = async () => {
        try {
            const config = {
                headers: { userToken: localStorage.getItem("userToken") },
            };
            const userId = localStorage.getItem("userId");
            if (userId === null) {
                return setIsLobbyOwner(false);
            }
            const lobby = await api.get("/users/" + userId + "/lobby", config);
            setIsLobbyOwner(lobby.data.owner.id === playerId);
        } catch (error) {
            handleError(error);
        }
    };

    const play = async (playerWord1, playerWord2) => {
        let loadingTimeoutId = setTimeout(() => setIsLoading(true), 750);
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
            kick();
        } finally {
            clearTimeout(loadingTimeoutId);
            setIsLoading(false);
        }
    };

    const handleQuit = () => {
        setQuitPopup((prevState) => !prevState);
    };

    useEffect(() => {
        if (achievementPopup) {
            setPopupClass("show");
            const timer = setTimeout(() => {
                setPopupClass("hide");
            }, 4 * 1000); // Change 5000 (5 seconds) to the delay you want

            return () => clearTimeout(timer); // This will clear the timeout if the component unmounts before the timeout is reached
        } else {
            setPopupClass("");
        }
    }, [achievementPopup]);

    const handleAbort = () => {
        setAbortGamePopup((prevState) => !prevState);
    };

    return (
        <div>
            {achievementPopup && (
                <p className={`achievement-popup ${popupClass}`}>
                    {achievementMsg}
                </p>
            )}
            <Typewriter text={remainingTime} />
            <BaseContainer className="game vertical-container">
                <playerContext.Provider value={playerValue}>
                    <BaseContainer className="game container halved-top">
                        <BaseContainer className="game horizontal-container">
                            <TargetWord />
                            {isLoading ? (
                                <div className="spinner-css">
                                    {" "}
                                    <RotateSpinner />{" "}
                                </div>
                            ) : null}
                            <Button
                                className="game-end-button"
                                onClick={() => handleAbort()}
                                disabled={!isLobbyOwner}
                            >
                                End Game
                            </Button>
                            {abortGamePopup && (
                                <GameContext.Provider
                                    value={abortGameValue}>
                                    <AbortGamePopup />
                                </GameContext.Provider>
                            )}
                            <Button onClick={() => handleQuit()}>Quit</Button>
                            {quitPopup && (
                                <GameContext.Provider value={quitPopupValue}>
                                    <QuitPopup />
                                </GameContext.Provider>
                            )}
                        </BaseContainer>
                    </BaseContainer>

                    <BaseContainer className="game flex-container">
                        <BaseContainer className="game container halved-one">
                            <WordBoard playFunction={play} />
                        </BaseContainer>
                        <BaseContainer className="game container halved-two">
                            <otherPlayersContext.Provider
                                value={otherPlayersValue}
                            >
                                <PlayerList />
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
        connected: PropTypes.object.isRequired,
        subscriptionsRef: PropTypes.object.isRequired,
        connectedTrigger: PropTypes.bool.isRequired,
    }).isRequired,
};

export default Game;
