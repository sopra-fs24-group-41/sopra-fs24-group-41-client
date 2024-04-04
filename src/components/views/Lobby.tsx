import React, {useState} from "react";
import { Button } from "components/ui/Button";
import "styles/views/Lobby.scss";
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
import {Gamemode, Player} from "../../types";

const GamemodeItem = ({
    gamemode,
    onSelect,
    isSelected,
}: {
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
    { name: "Rhinoceron", icon: "/images/RedSquid.jpg", token: "1"},
    { name: "Froggy", icon: "/images/BlueFrog.jpg", token: "2"},
    { name: "The big rock", icon: "/images/PinkBunny.jpg", token: "3"},
];

let lobbyOwner: Boolean;
lobbyOwner = true;

const LobbyPage = () => {
    const [selectedGamemode, setSelectedGamemode] = useState<Gamemode >(null);

    const selectGamemode = (gamemode: Gamemode) => {
        setSelectedGamemode((prevSelectedGamemode) =>
            prevSelectedGamemode === gamemode ? null : gamemode
        );
    };

    const startGame = () => {
        alert("To be implemented!");
    };

    let content = (
        <div>
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
            <div className="gamemode button-container">
                <Button
                    width="100%"
                    onClick={() => startGame()}
                    disabled={!selectedGamemode || !lobbyOwner}
                >
                    Start Game
                </Button>
            </div>
        </div>
    );

    let usercontent = (
        <div>
            <ul className="player list">
                {players.map((player: Player) => (
                    <li key={player.token}>
                        <div className="player container">
                            <div className="player icon">
                                <img src={player.icon} alt="player icon"/>

                            </div>
                            {player.name}
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
                    <p className="lobby p">Select a Gamemode</p>
                    {content}
                </div>
                <div className="lobbypage container">
                    <h2>List of players</h2>
                    {usercontent}
                </div>
            </BaseContainer>
        </div>
    );

};

export default LobbyPage;
