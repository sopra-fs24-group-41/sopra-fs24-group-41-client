import React, {createContext, useState} from "react";
import { Button } from "components/ui/Button";
import QuitPopup from "components/popup-ui/QuitPopup";
import "styles/views/Lobby.scss";
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
import {Gamemode, Player} from "../../types";
import {useNavigate} from "react-router-dom";
import IMAGES from "../../assets/images/index1.js"

const GamemodeItem = ({gamemode, onSelect, isSelected,}:
    {
    gamemode: Gamemode;
    onSelect: (gamemode: Gamemode) => void;
    isSelected: boolean;
}) => (
    <div
        className={`gamemode container${isSelected ? " selected" : ""}`}
        onClick={() => onSelect(gamemode)}
    >
        <div className="gamemode name">{gamemode.gamemodeName}</div>
        <div className="gamemode description">{gamemode.description}</div>
    </div>
);


GamemodeItem.propTypes = {
    gamemode: PropTypes.object,
};

const gamemodes= [
    { gamemodeName: "Fusion Frenzy", description: "How fast are you?" },
    { gamemodeName: "Casual", description: "chill and relaxed" },
    { gamemodeName: "Wombo Combo!!", description: "Make some bomb combos" },
];

const players= [
    { name: "Rhinoceron", icon: IMAGES.RedSquid, token: "1"},
    { name: "Froggy", icon: IMAGES.BlueFrog, token: "2"},
    { name: "The big rock", icon: IMAGES.PinkBunny, token: "3"},
];

let lobbyOwner = true;

let lobby;
// method to check whether a player is the lobby Owner, also can be shown in the game lobby screen when implemented.
function isLobbyOwner(player: Player) {
    return player === lobby.owner;
}

// helper method to check for the winner of last round
function islastWinner(player: Player)  {
    return player === lobby.lastWinner;
}

export const context = createContext();

const LobbyPage = () => {
    const navigate = useNavigate();
    const [selectedGamemode, setSelectedGamemode] = useState<Gamemode>(null);
    const [quitPopup, setQuitPopup] = useState(false);


    const selectGamemode = (gamemode: Gamemode) => {
        setSelectedGamemode((prevSelectedGamemode) =>
            prevSelectedGamemode === gamemode ? null : gamemode
        );
    };

    const handleQuit = () => {
        setQuitPopup((prevState) => !prevState);
    }

    const startGame = () => {
        alert("To be implemented!");
    };

    let content = (
        <div>
            <p>Select a Gamemode</p>
            <ul className="gamemode list">
                {gamemodes.map((gamemode: Gamemode) => (
                    <li key={gamemode.gamemodeName}>
                        <GamemodeItem
                            gamemode={gamemode}
                            onSelect={selectGamemode}
                            isSelected={gamemode === selectedGamemode}
                        />
                    </li>
                ))}
            </ul>


        </div>
    );

    let usercontent = (
        <div>
            <p> Currently active players </p>
            <ul className="player list">
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

        <div className="container-wrapper">
            <BaseContainer>
                <div className="lobbypage container">
                    <h2>Grealish Lobby</h2>
                    <div className="lobbypage game-and-players-container">
                        <div className="gamemode standard">
                            {content}
                        </div>
                        <BaseContainer className="player-list-container">
                            <div>
                                {usercontent}
                            </div>
                        </BaseContainer>

                    </div>
                    <div className="button-container">
                        <Button
                            className="button"
                            onClick={() => startGame()}
                            disabled={!selectedGamemode || !lobbyOwner}
                        >
                            Start Game
                        </Button>
                        <Button
                            className="button"
                            onClick={() => handleQuit()}
                        >
                            Quit
                        </Button>
                    </div>
                </div>
            </BaseContainer>
            {quitPopup && (
                <context.Provider value={{ quitPopup, setQuitPopup }}>
                    <QuitPopup />
                </context.Provider>)
            }
        </div>

    );
}

export default LobbyPage;
