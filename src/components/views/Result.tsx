import React, {createContext, useState} from "react";
import { Button } from "components/ui/Button";
import "styles/views/Result.scss";
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
import {Player} from "../../types";
import {useNavigate} from "react-router-dom";
import IMAGES from "../../assets/images/index1.js"

const players= [
    { name: "Rhinoceron", icon: IMAGES.RedSquid, token: "1"},
    { name: "Froggy", icon: IMAGES.BlueFrog, token: "2"},
    { name: "The big rock", icon: IMAGES.PinkBunny, token: "3"},
];


const Result = () => {
    const usercontent = (
        <div className = "res">
            <h2> Results </h2>
            <ul className = "res list">
                {players.map((player: Player) => (
                    <li key={player.token}>
                        <div className="player container">
                            <div className="player icon">
                                <img src={player.icon} alt="player icon"/>
                            </div>
                            <div className="player name">{player.name}
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );

    return (
        <BaseContainer className="res container">
            <div className="res list">
                {usercontent} 
            </div>
        </BaseContainer>)
}


export default Result