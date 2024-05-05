import React, {useContext} from "react";
import PropTypes from "prop-types";
import "styles/views/Game.scss";
import {otherPlayersContext, playerContext} from "./Game";

const PlayerContainer = ({ otherPlayer }) => {
    const { player } = useContext(playerContext);

    let otherPlayerWord = otherPlayer.getNewestWord();

    let wordFormat = player.getWords().some(word => word.name === otherPlayerWord.name) ? "visible-word" : "blurred-word";
    console.log("My words: ");
    console.log(player.getWords());
    console.log("Their word: ");
    console.log(otherPlayerWord);
    console.log(wordFormat);
    
    return (
        <div className="player-word container">
            <div className="player-word player-name">{otherPlayer.name}</div>
            <div className={`player-word ${wordFormat}`}>{otherPlayerWord.name}</div>
        </div>
    );
};

PlayerContainer.propTypes = {
    otherPlayer: PropTypes.object.isRequired
}

const PlayerList = ({ }) => {
    const { otherPlayers } = useContext(otherPlayersContext);
    

    return (
        <div className="game vertical-container">
            <h2>Players</h2>
            <ul className="player-list list">
                {otherPlayers.map((p, index) => (
                    <li key={index}>
                        <PlayerContainer otherPlayer={p}/>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PlayerList;