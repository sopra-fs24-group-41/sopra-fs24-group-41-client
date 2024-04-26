import React, { useState, createContext, useEffect } from "react";
import "styles/views/Result.scss";
import BaseContainer from "components/ui/BaseContainer";
import IMAGES from "../../assets/images/index1.js";
import { useLocation } from "react-router-dom";
import { api, handleError } from "helpers/api";
import Player from "../../models/Player.js";
import Lobby from "../../models/Lobby.js";

const changeBack = (status, location) => {
    if (location.pathname !== "/result") {
        return 0;
    }
    if (status) return 2;
    else return 1;
};

const result = { WIN: "You Won!", LOSS: "You Lost..." };
let winner = "Jackie";
let current = "Jackie"; //Determine Winner OR Loser by changing this variable!
const result_status = winner === current ? true : false;

export const ResContext = createContext<number>(
    changeBack(result_status, location)
);

const renderPlayer = (pName) => {
    if (pName === winner) return "player-container winner";
    if (pName === current) return "player-container loser";
    else return "player-container";
};

const renderIcon = (pName) => {
    if (pName === winner) return "winner";
    if (pName === current) return "loser";
    else return "player-icon";
};

const Result = () => {
    const location = useLocation();
    const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
    const [res, setRes] = useState();
    const [rplayers, setRPlayers] = useState<Player[]>([]);

    const handlePlayerHover = (player: Player) => {
        setSelectedPlayer(player);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get("/lobbies/1516");
                let lobbyData = new Lobby(response.data);
                let retrievedPlayers = lobbyData.players.map(playerData => new Player(playerData));
                console.log(retrievedPlayers);
                setRPlayers(retrievedPlayers);
            } catch(error) {
                alert("Something didn't work");
            }
        };
    
        fetchData(); 
    }, []);

    const usercontent = (
        <div className="res">
            <h2>{result_status ? result.WIN : result.LOSS}</h2>
            <p>Results</p>
            <ul className="res-list">
                {rplayers.map((player: Player) => (
                    <li
                        key={player.wordCount}
                        onMouseEnter={() => handlePlayerHover(player)}
                        onMouseLeave={() => setSelectedPlayer(null)}
                    >
                        <div
                            className={`player-container ${renderPlayer(
                                player.name
                            )} ${selectedPlayer === player ? "selected" : ""}`}
                        >
                            <div className={renderIcon(player.name)}>
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
            <ResContext.Provider value={res}>
                <div>{usercontent}</div>
            </ResContext.Provider>
        </BaseContainer>
    );
};

export default Result;
