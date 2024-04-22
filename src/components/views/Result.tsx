import React, { useState, createContext } from "react";
import "styles/views/Result.scss";
import BaseContainer from "components/ui/BaseContainer";
import { Player } from "../../types";
import IMAGES from "../../assets/images/index1.js";
import { useLocation } from "react-router-dom";

const players = [
    {
        name: "Rhinoceron",
        icon: IMAGES.RedSquid,
        token: "1",
        wins: "69",
        losses: "1",
        total_wins: "100",
        total_losses: "1",
        words_generated: "100",
    },
    {
        name: "Froggy",
        icon: IMAGES.BlueFrog,
        token: "2",
        wins: "0",
        losses: "70",
        words_generated: "100",
    },
    {
        name: "Bunny",
        icon: IMAGES.PinkBunny,
        token: "3",
        wins: "1",
        losses: "69",
        words_generated: "100",
    },
];

const changeBack = (status, location) => {
    if (location.pathname !== "/result") {
        return 0;
    }
    if (status) return 2;
    else return 1;
};

const result = { WIN: "You Won!", LOSS: "You Lost..." };
let winner = "Froggy";
let current = "Bunny"; //Determine Winner OR Loser by changing tis variable!
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
    const handlePlayerHover = (player: Player) => {
        setSelectedPlayer(player);
    };

    const usercontent = (
        <div className="res">
            <h2>{result_status ? result.WIN : result.LOSS}</h2>
            <p>Results</p>
            <ul className="res-list">
                {players.map((player: Player) => (
                    <li
                        key={player.token}
                        onMouseEnter={() => handlePlayerHover(player)}
                        onMouseLeave={() => setSelectedPlayer(null)}
                    >
                        <div
                            className={`player-container ${renderPlayer(
                                player.name
                            )} ${selectedPlayer === player ? "selected" : ""}`}
                        >
                            <div className={renderIcon(player.name)}>
                                <img src={player.icon} alt="player icon" />
                            </div>
                            <div className="player-details">
                                <div className="player-name">
                                    {" "}
                                    <div>{player.name}</div>{" "}
                                    <div>Wins: {player.wins}</div>
                                </div>
                                {selectedPlayer === player && (
                                    <div className="player-info">
                                        <div>Losses: {player.losses}</div>
                                        <div>
                                            Words Generated:{" "}
                                            {player.words_generated}
                                        </div>

                                        {player.total_wins &&
                                            player.total_losses && (
                                            <div>
                                                <div>
                                                    Total Wins:{" "}{player.total_wins}
                                                </div>
                                                <div>
                                                    Total Losses:{" "}{player.total_losses}
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
