import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import { Button } from "components/ui/Button";
import "styles/views/Lobby.scss";
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
import {Gamemode} from "../../types";

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
        className="gamemode container"
        onClick={() => onSelect(gamemode)}
        style={{
            border: isSelected ? "1px solid #1E90FF" : "none",
        }}
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

let lobbyOwner: Boolean;
lobbyOwner = true;
const LobbyPage = () => {
    const navigate = useNavigate();
    const [selectedGamemode, setSelectedGamemode] = useState<Gamemode | null>(null);

    const selectGamemode = (gamemode: Gamemode) => {
        setSelectedGamemode((prevSelectedGamemode) =>
            prevSelectedGamemode === gamemode ? null : gamemode
        );
    };

    const startGame = () => {
        alert("To be implemented!");
    };

    let content;
    content = (
        <div>
            <ul className="lobby gamemode-list">
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
                    disabled={!selectedGamemode && !lobbyOwner}
                >
                    Start Game
                </Button>
            </div>
        </div>
    );

    return (
        <div className="container-wrapper">
            <BaseContainer>
                <div className="lobby container">
                    <h2>Grealish Lobby</h2>
                    <p className="lobby p">Select a Gamemode</p>
                    {content}
                </div>
            </BaseContainer>
        </div>
    );
};

/**
 * You can get access to the history object's properties via the useLocation, useNavigate, useParams, ... hooks.
 */
export default LobbyPage;
