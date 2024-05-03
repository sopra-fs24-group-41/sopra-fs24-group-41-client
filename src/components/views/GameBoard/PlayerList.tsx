import React, { useContext } from "react";
import PropTypes from "prop-types";
import Player from "models/Player";
import { playerContext } from "./Game";
import "styles/views/Game.scss";

const PlayerContainer = ({ player }) => (
    <div className="player-word container">
        <div className="player-word player-name">{player.name}</div>
        <div className="word">{player.getNewestWord() === null ? "fire" : player.getNewestWord().name}</div>
    </div>
);

PlayerContainer.propTypes = {
    player: PropTypes.instanceOf(Player).isRequired
};

const PlayerList = () => {
    const { player } = useContext(playerContext);

    return (
        <div className="player-list container">
            <h2>Players</h2>
            <ul className="player-list list">
                <li>
                    <PlayerContainer player={player} />
                </li>
            </ul>
        </div>
    );
};

export default PlayerList;
