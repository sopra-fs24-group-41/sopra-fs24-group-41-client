import React, { useContext } from "react";
import PropTypes from "prop-types";
import "styles/views/Game.scss";
import { otherPlayersContext, playerContext } from "./Game";
import ICONS from "../../../assets/icons/index.js";
import IMAGES from "../../../assets/images/index1.js";
import hashForAnon from "../../../helpers/utils";

const PlayerContainer = ({ otherPlayer }) => {
    const { player } = useContext(playerContext);

    let otherPlayerWord = otherPlayer.getNewestWord();

    let wordFormat = player
        .getWords()
        .some((word) => word.name === otherPlayerWord.name)
        ? "visible-word"
        : "blurred-word";

    return (
        <div className="player-word container">
            <div className="player-icon">
                <img
                    src={
                        IMAGES[otherPlayer.profilePicture] ||
                        ICONS[hashForAnon(otherPlayer.name)]
                    }
                    alt="player icon"
                />
                {otherPlayer.name + " | "}

                <div className={`player-word ${wordFormat}`}>
                    {otherPlayerWord.name}
                </div>
            </div>
        </div>
    );
};

PlayerContainer.propTypes = {
    otherPlayer: PropTypes.object.isRequired,
};

const PlayerList = ({}) => {
    const { otherPlayers } = useContext(otherPlayersContext);

    return (
        <div className="game vertical-container player-list">
            <h1>Players | Recent Word</h1>
            <ul>
                {otherPlayers.map((p, index) => (
                    <li key={index}>
                        <PlayerContainer otherPlayer={p} />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PlayerList;