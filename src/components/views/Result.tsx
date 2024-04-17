import React, { useState } from "react";
import "styles/views/Result.scss";
import BaseContainer from "components/ui/BaseContainer";
import { Player } from "../../types";
import IMAGES from "../../assets/images/index1.js";

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

const result = {WIN: "You Won!", LOSS: "You Lost..."};
const result_status = true;
const winner = "Froggy";

const Result = () => {
    const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
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
                            className={`player-container ${
                                selectedPlayer === player ? "selected" : ""
                            }`}
                        >
                            <div className="player-icon">
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
                                        <div>Losses: {player.losses},</div>
                                        <div>Words Generated: {player.words_generated}</div>

                                        {player.total_wins && player.total_losses && (
                                            <div>
                                                <div>Total Wins: {player.total_wins},</div>
                                                <div>Total Losses: {player.total_losses}</div>
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
            <div>{usercontent}</div>
        </BaseContainer>
    );
};

export default Result;
