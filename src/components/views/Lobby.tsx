import React, {createContext, useState, useEffect} from "react";
import { Button } from "components/ui/Button";
import QuitPopup from "components/popup-ui/QuitPopup";
import "styles/views/Lobby.scss";
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import CopyButton from "../ui/CopyButton";
import Player from "../../models/Player.js";
import Lobby from "../../models/Lobby.js"
import Gamemode from "../../models/GameMode.js";
import {api, handleError} from "../../helpers/api.js";

const GamemodeItem = ({gamemode, onSelect, isSelected}:
    {
    gamemode: Gamemode;
    onSelect: (gamemode: Gamemode) => void;
    isSelected: boolean;
}) => (
    <div
        className={`gamemode container${isSelected ? " selected" : ""}`}
        onClick={() => onSelect(gamemode)}
    >
        <div className="gamemode name">{gamemode.name}</div>
        <div className="gamemode description">{gamemode.description}</div>
    </div>
);


GamemodeItem.propTypes = {
    gamemode: PropTypes.object,
};

const gamemodes= [
    { name: "Fusion Frenzy", description: "How fast are you?" },
    { name: "Casual", description: "chill and relaxed" },
    { name: "Wombo Combo!!", description: "Make some bomb combos" },
];

export const context = createContext();

const LobbyPage = () => {
    const [selectedGamemode, setSelectedGamemode] = useState<Gamemode>(null);
    const [quitPopup, setQuitPopup] = useState(false);
    const [players, setPlayers] = useState<Player>([]);
    const [lobby, setLobby] = useState<Lobby>([]);
    const params = useParams();
    const lobbycode = params.lobbycode;

    useEffect(() => {
        const fetchLobbyAndPlayers = async () => {
            try {
                const response = await api.get("/lobbies/" + lobbycode);
                const lobbyData = new Lobby(response.data);
                const playerData = response.data.players.map(player => new Player(player));
                setLobby(lobbyData);
                setPlayers(playerData);
                console.log("this is the lobby");
                console.log(lobby);
                console.log("this is the players");
                console.log(players);

            } catch (error) {
                handleError(error)
                alert("Unable to display lobby data");
            }
        };
        fetchLobbyAndPlayers();
    }, []);


    const selectGamemode = (gamemode: Gamemode) => {
        setSelectedGamemode((prevSelectedGamemode) =>
            prevSelectedGamemode === gamemode ? null : gamemode
        );
    };

    const handleQuit = () => {
        setQuitPopup((prevState) => !prevState);
    }

    // Still need to implement check for if user is lobbyowner (had problems with this)
    function isLobbyOwner(player: Player) {
        return true;
    }

    const startGame = async () => {

        try {
            alert("Starting game needs to be implemented")
            /*const response = await api.post("/lobbies/" + lobby.code + "/players");
            const playerData = response.data.map(player => new Player(player));
            const lobbyData = response.data.map(lobby => new Lobby(lobby));
            console.log(playerData);
            console.log(lobbyData)
            setPlayers(playerData);
            setLobby(lobbyData)*/

        } catch (error) {
            handleError(error)
            alert(handleError(error))
        }
    }

    let content = (
        <div>
            <p>Select a Gamemode</p>
            <ul className="gamemode list">
                {gamemodes.map((gamemode: Gamemode) => (
                    <li key={gamemode.name}>
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
                            <div className={isLobbyOwner(player) ? "player owner-name" : "player name"}>
                                {player.name}
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
                    <h2>{lobby.name}</h2>
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
                            className="button-container button"
                            onClick={() => startGame()}
                            disabled={!selectedGamemode || isLobbyOwner}
                        >
                            Start Game
                        </Button>
                        <Button
                            className="button-container button"
                            onClick={() => handleQuit()}
                        >
                            Quit
                        </Button>
                    </div>
                </div>
            </BaseContainer>
            <div>
                <CopyButton copyText={lobby.code}/>
            </div>
            {quitPopup && (
                <context.Provider value={{ quitPopup, setQuitPopup }}>
                    <QuitPopup />
                </context.Provider>)
            }

        </div>
    );
}

export default LobbyPage;
