import React, { useState, createContext, useEffect, useContext } from "react";
import "styles/views/Result.scss";
import BaseContainer from "components/ui/BaseContainer";
import IMAGES from "../../assets/images/index1.js";
import { useNavigate } from "react-router-dom";
import { api, handleError } from "helpers/api";
import Player from "../../models/Player.js";
import { Button } from "components/ui/Button";


const Result = () => {
    const navigate = useNavigate();
    const [player, setPlayer] = useState<Player>(new Player);
    const [winner, setWinner] = useState();
    const [players, setPlayers] = useState<Player[]>([]);
    const playerId = localStorage.getItem("playerId");
    const playerToken = localStorage.getItem("playerToken");
    const lobbyCode = localStorage.getItem("lobbyCode");
    const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
    const [res, setRes] = useState();
    const resultMessage = { WIN: "You Won!", LOSS: "You Lost..." };
    const [resultStatus, setResultStatus] = useState<boolean>(false);

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
        players.sort((a, b) => b.points - a.points);
        setWinner(players[0])
    }, [players]);

    useEffect(() => {
        setResultStatus(winner?.id.toString() === playerId.toString());
    }, [winner]);

    const renderPlayer = (playerId) => {
        if (winner && playerId === winner.id)return "player-container winner";
        if (playerId === player.id) return "player-container loser";
        else return "player-container";
    };
    
    const renderIcon = (playerId) => {
        if (winner && playerId === winner.id) return "winner";
        if (playerId === player.id) return "loser";
        else return "player-icon";
    };

    const handleBackToLobby = () =>{
        let lobbyCode = localStorage.getItem("lobbyCode");
        navigate("/lobby/" + lobbyCode);
    }

    const userContent = (
        <div className="res">
            <h2>{resultStatus ? resultMessage.WIN : resultMessage.LOSS}</h2>
            <p>Results</p>
            <ul className="res-list">
                {players.map((player: Player) => (
                    <li
                        key={player.wordCount}
                        onMouseEnter={() => setSelectedPlayer(player)}
                        onMouseLeave={() => setSelectedPlayer(null)}
                    >
                        <div
                            className={`player-container ${renderPlayer(
                                player.id
                            )} ${selectedPlayer === player ? "selected" : ""}`}
                        >
                            <div className={renderIcon(player.id)}>
                                <img src={IMAGES[player.profilePicture] || IMAGES.BlueFrog} alt="player icon" />
                            </div>
                            <div className="player-details">
                                <div className="player-name">
                                    {" "}
                                    <div>{player.name}</div>{" "}
                                    <div>Wins: {player.wins || 0}</div>
                                </div>
                                {selectedPlayer === player && (
                                    <div className="player-info">
                                        <div>Losses: {player.losses || 0}</div>
                                        <div>
                                            Words Generated:{" "}
                                            {player.words_generated || 0}
                                        </div>

                                        {player.total_wins !== null && player.total_losses !== null && (
                                            <div>
                                                <div>
                                                    Total Wins: {player.total_wins || 0}
                                                </div>
                                                <div>
                                                    Total Losses: {player.total_losses || 0}
                                                </div>
                                            </div>
                                        )}
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

export default Result;
