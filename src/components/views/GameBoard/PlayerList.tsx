import React from "react";
import PropTypes from "prop-types";
import Player from "models/Player";
import "styles/views/Game.scss";

const PlayerContainer = ({ player }) => (
    <div className="player-word container">
        <div className="player-word player-name">{player.name}</div>
        <div className="word">{player.getNewestWord().name}</div>
    </div>
);

PlayerContainer.propTypes = {
    player: PropTypes.object.isRequired
}

const PlayerList = ({ players }) => {
    return (
        <div className="player-list container">
            <h2>Players</h2>
            <ul className="player-list list">
                {players.map((p, index) => (
                    <li key={index}>
                        <PlayerContainer player={p}/>
                    </li>
                ))}
            </ul>
        </div>
    );
};

PlayerList.propTypes = {
    players: PropTypes.arrayOf(Player).isRequired
};

export default PlayerList;