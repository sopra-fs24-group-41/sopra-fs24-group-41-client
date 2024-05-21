import React, { useState, useEffect } from "react";
import "styles/views/Result.scss";
import BaseContainer from "components/ui/BaseContainer";
import IMAGES from "../../assets/images/index1.js";
import { useNavigate } from "react-router-dom";
import { api, useError } from "helpers/api";
import Player from "../../models/Player.js";
import { Button } from "components/ui/Button";
import PropTypes from "prop-types";
import ICONS from "../../assets/icons/index.js";
import hashForAnon from "../../helpers/utils";


const Result = ({ stompWebSocketHook }) => {
    const navigate = useNavigate();
    const [player, setPlayer] = useState<Player>(new Player);
    const [winner, setWinner] = useState();
    const [players, setPlayers] = useState<Player[]>([]);
    const playerId = Number(localStorage.getItem("playerId"));
    const playerToken = localStorage.getItem("playerToken");
    const lobbyCode = localStorage.getItem("lobbyCode");
    const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
    const resultMessage = { WIN: "You Won!", LOSS: "You Lost..." };
    const [resultStatus, setResultStatus] = useState<boolean>(false);
    const [pID, setPID] = useState();
    const { handleError } = useError();

    useEffect(() => {
        const fetchPlayer = async () => {
            try {
                let response = await api.get(`/lobbies/${lobbyCode}/players/${playerId}`, { headers: { "playerToken": playerToken } });
                let foundPlayer = new Player(response.data);
                setPlayer(foundPlayer);
                setPID(foundPlayer.id);
            } catch (error) {
                handleError(error, navigate);
            }
        };
        

        const fetchOtherPlayers = async () => {
            try {
                let response = await api.get(`/lobbies/${lobbyCode}/players`,);
                setPlayers(response.data.map(p => new Player(p)));
                console.log(response.data);
            } catch (error) {
                handleError(error, navigate);
            }
        };
        fetchPlayer();
        fetchOtherPlayers();
    }, []);

    useEffect(() => {
        players.sort((a, b) => b.points - a.points);
        setWinner(players.find(player => player.status === "WON"))
    }, [players]);

    useEffect(() => {
        setResultStatus(winner?.id === playerId);
    }, [winner]);

    const renderPlayer = (ID) => {
        if (winner && ID === winner.id)return "player-container winner";
        else if (ID  === pID)return "player-container loser";
        else return "player-container";
    };
    
    const renderIcon = (playerId) => {
        if (winner && playerId === winner.id) return "winner";
        if (playerId === player.id) return "loser";
        else return "player-icon-result";
    };

    const handleBackToLobby = () =>{
        let lobbyCode = localStorage.getItem("lobbyCode");
        navigate("/lobby/" + lobbyCode);
    }

    const kick = () => {
        localStorage.removeItem("playerId");
        localStorage.removeItem("playerToken");
        localStorage.removeItem("lobbyCode");
        navigate("/lobbyoverview");
    };

    // websocket subscription
    useEffect(() => {
        if (stompWebSocketHook.connected.current === true) {
            stompWebSocketHook.subscribe(`/topic/lobbies/${lobbyCode}`);
            stompWebSocketHook.subscribe(`/topic/lobbies/${lobbyCode}/game`);
        }

        return () => {
            if (stompWebSocketHook.connected.current === true) {
                stompWebSocketHook.unsubscribe(`/topic/lobbies/${lobbyCode}`);
                stompWebSocketHook.unsubscribe(
                    `/topic/lobbies/${lobbyCode}/game`
                );
            }
            stompWebSocketHook.resetMessagesList();
        };
    }, [stompWebSocketHook.connected.current]);

    // websocket message interpretation
    useEffect(() => {
        let messagesLength = stompWebSocketHook.messages.length;
        if (messagesLength > 0) {
            const messagesList = stompWebSocketHook.messages;
            messagesList.forEach((message) => {
                if (message.instruction === "start") {
                    navigate("/lobby/game");
                }

                if (message.instruction === "kick") {
                    kick();
                }
            });
            stompWebSocketHook.resetMessagesList();
        }
    }, [stompWebSocketHook.messages]);

    useEffect(() => {
        const handleTabClose = async () => {
            const config = {
                headers: {playerToken: playerToken},
            }
            try {
                await api.delete("/lobbies/" + lobbyCode + "/players/" + playerId , config);
                kick()
            } catch (error) {
                handleError(error);
            }
        }
        window.addEventListener("beforeunload", handleTabClose);

        return () => {
            window.removeEventListener("beforeunload", handleTabClose);
        };
    }, []);

    const userContent = (
        <div className="res">
            <h2>{resultStatus ? resultMessage.WIN : resultMessage.LOSS}</h2>
            <p>Results</p>
            <ul className="res-list">
                {players.map((player: Player) => (
                    <li
                        key={player.id}
                        onMouseEnter={() => setSelectedPlayer(player)}
                        onMouseLeave={() => setSelectedPlayer(null)}
                    >
                        <div
                            className={`${renderPlayer(
                                player.id
                            )} ${selectedPlayer === player ? "selected" : ""}`}
                        >
                            <div className={renderIcon(player.id)}>
                                <img src={IMAGES[player.profilePicture] || ICONS[hashForAnon(player.name)]} alt="player icon" />
                            </div>
                            <div className="player-details">
                                <div className="player-name">
                                    {" "}
                                    <div>{player.name}</div>{" "}
                                </div>
                                {selectedPlayer === player && (
                                    <div className="player-info">
                                        <div>
                                            Words Generated:{" "}
                                            {player.wordCount-4}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );

    return (
        <BaseContainer className="res-container">
            <div>{userContent}</div>
            <Button onClick={handleBackToLobby}>Back to Lobby</Button>
        </BaseContainer>
    );
};

Result.propTypes = {
    stompWebSocketHook: PropTypes.shape({
        subscribe: PropTypes.func.isRequired,
        unsubscribe: PropTypes.func.isRequired,
        sendMessage: PropTypes.func.isRequired,
        messages: PropTypes.array.isRequired,
        resetMessagesList: PropTypes.func.isRequired,
        connected: PropTypes.object.isRequired,
        subscriptionsRef: PropTypes.object.isRequired,
    }).isRequired,
};

export default Result;