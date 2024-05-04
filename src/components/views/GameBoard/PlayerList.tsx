import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Player from "models/Player";
import "styles/views/Game.scss";
import { api, handleError } from "../../../helpers/api";
import { useNavigate } from "react-router-dom";

const PlayerContainer = ({ player }) => (
    <div className="player-word container">
        <div className="player-word player-name">{player.name}</div>
        <div className="word">{player.getNewestWord().name}</div>
    </div>
);

PlayerContainer.propTypes = {
    player: PropTypes.object.isRequired
}

const PlayerList = ({ }) => {
    const [players, setPlayers] = useState<Player[]>([]);
    const lobbyCode = localStorage.getItem("lobbyCode");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOtherPlayers = async () => {
            try {
                let response = await api.get(`/lobbies/${lobbyCode}/players`,);
                setPlayers(response.data.map(p => new Player(p)));
            } catch (error) {
                handleError(error, navigate);
            }
        };

        fetchOtherPlayers();
    }, []);

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

export default PlayerList;