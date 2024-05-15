import React, { createContext, useEffect, useState } from "react";
import { Button } from "components/ui/Button";
import QuitPopup from "components/popup-ui/QuitPopup";
import "styles/views/Lobby.scss";
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
import { useNavigate, useParams } from "react-router-dom";
import CopyButton from "../ui/CopyButton";
import Player from "../../models/Player.js";
import Lobby from "../../models/Lobby.js";
import Gamemode from "../../models/GameMode.js";
import { api, handleError } from "../../helpers/api.js";
import IMAGES from "../../assets/images/index1.js";
import ICONS from "../../assets/icons/index.js";
import hashForAnon from "components/views/utils";

const GamemodeItem = ({
    gamemode,
    onSelect,
    isSelected,
    ownerMode,
}: {
    gamemode: Gamemode;
    onSelect: (gamemode: Gamemode) => void;
    isSelected: boolean;
    ownerMode: boolean;
}) => (
    <div
        className={`gamemode container${isSelected ? " selected" : ""}${
            gamemode.active && ownerMode ? "" : " inactive"
        }`}
        onClick={
            gamemode.active && ownerMode ? () => onSelect(gamemode) : undefined
        }
    >
        <div className="gamemode name">{gamemode.name}</div>
        {isSelected ? (
            <div className="gamemode description">
                {longerdesc[gamemode.name]}
            </div>
        ) : (
            <div className="gamemode description">{gamemode.description}</div>
        )}
    </div>
);

GamemodeItem.propTypes = {
    gamemode: PropTypes.object,
};

const gamemodes = [
    {
        name: "Fusion Frenzy",
        description: "How fast are you?",
        serverName: "FUSIONFRENZY",
        active: true,
    },
    {
        name: "Wombo Combo",
        description: "Make some bomb combos!",
        serverName: "WOMBOCOMBO",
        active: true,
    },
    {
        name: "Finite Fusion",
        description: "Use your resources wisely.",
        serverName: "FINITEFUSION",
        active: true,
    },
    {
        name: "Sandbox",
        description: "Explore infinite combinations.",
        serverName: "STANDARD",
        active: true,
    },
];

const longerdesc: { [key: string]: string } = {
    "Fusion Frenzy":
        "All players get the same target word, whoever gets it first, wins.",
    "Wombo Combo":
        "All players will get a different set of target words, the one that gets all their target words first, wins.",
    "Finite Fusion":
        "You have only a limited number of words to get the target word.",
    Sandbox: "We didn't just clone Neal's Infinite Craft, did we...?",
};

export const LobbyContext = createContext();

const LobbyPage = ({ stompWebSocketHook }) => {
    const [selectedGamemode, setSelectedGamemode] = useState<Gamemode>(null);
    const [quitPopup, setQuitPopup] = useState(false);
    const [lobby, setLobby] = useState<Lobby>({ players: [] });
    const [ownerMode, setOwnerMode] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [lobbyname, setLobbyname] = useState();
    const [publicA, setPublicA] = useState();
    const [selectedTimer, setSelectedTimer] = useState(0);
    const [selectedTimerIndex, setSelectedTimerIndex] = useState(0);
    const [toggleTimerTriggered, setToggleTimerTriggered] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);

    const navigate = useNavigate();
    const params = useParams();
    const lobbycode = params.lobbycode;

    const timerOptions = [
        { label: "None", value: 0 },
        { label: "1 min", value: 60 },
        { label: "1 min 30s", value: 90 },
        { label: "2 min", value: 120 },
        { label: "2 min 30s", value: 150 },
        { label: "3 min", value: 180 },
        { label: "3 min 30s", value: 210 },
        { label: "4 min", value: 240 },
        { label: "4 min 30s", value: 270 },
        { label: "5 min", value: 300 },
    ];

    useEffect(() => {
        // Fetch lobby and players data
        const fetchLobbyAndPlayers = async () => {
            try {
                const response = await api.get("/lobbies/" + lobbycode);
                let lobbyData = new Lobby(response.data);
                setLobby(lobbyData);
                if (
                    lobbyData.owner.id ===
                    parseInt(localStorage.getItem("playerId"))
                )
                    setOwnerMode(true);
            } catch (error) {
                handleError(error, navigate);
                localStorage.removeItem("playerId");
                localStorage.removeItem("playerToken");
                localStorage.removeItem("lobbyCode");
                navigate("/lobbyoverview");
            }
        };
        fetchLobbyAndPlayers();
    }, []);

    useEffect(() => {
        if (lobby.mode)
            setSelectedGamemode(
                gamemodes.find((mode) => mode.serverName === lobby.mode)
            );
        if (lobby.name) setLobbyname(lobby.name);
        if (lobby.publicAccess) setPublicA(lobby.publicAccess);
    }, [lobby]);

    useEffect(() => {
        if (stompWebSocketHook.connected === true) {
            stompWebSocketHook.subscribe(`/topic/lobbies/${lobbycode}`);
            stompWebSocketHook.subscribe(`/topic/lobbies/${lobbycode}/game`);
        }

        return () => {
            if (stompWebSocketHook.connected === true) {
                stompWebSocketHook.unsubscribe(`/topic/lobbies/${lobbycode}`);
                stompWebSocketHook.unsubscribe(
                    `/topic/lobbies/${lobbycode}/game`
                );
            }
            stompWebSocketHook.resetMessagesList();
        };
    }, [stompWebSocketHook.connected]);

    useEffect(() => {
        let messagesLength = stompWebSocketHook.messages.length;
        if (
            messagesLength > 0 &&
            stompWebSocketHook.messages[messagesLength - 1] !== undefined
        ) {
            const newObject = stompWebSocketHook.messages[messagesLength - 1];
            const newLobbyData = new Lobby(newObject);
            if (newLobbyData.code !== null) setLobby(newLobbyData);
            if (newObject.instruction === "start") {
                navigate("/lobby/game");
            }
            if (newObject.instruction === "kick") {
                console.log("kicked because: ", newObject.reason) // replace with showing message
                kick();
            }
        }
    }, [stompWebSocketHook.messages]);

    const updateLobby = async (
        name: string,
        publicAccess: boolean,
        mode: string,
        gameTime: number
    ) => {
        if (!ownerMode)
            return 

        setIsUpdating(true); // Start updating

        const config = {
            headers: {
                playerToken: localStorage.getItem("playerToken"),
            },
        };
        const body = {
            name: name,
            publicAccess: publicAccess,
            mode: mode,
            gameTime: gameTime,
        };
        try {
            await api.put(`/lobbies/${lobbycode}`, body, config);
        } catch (e) {
            handleError(e);
        }
        setIsUpdating(false); // Stop updating
    };

    const selectGamemode = (gamemode: Gamemode) => {
        if (gamemode !== selectedGamemode)
            updateLobby(null, null, gamemode.serverName, null);
        if (!ownerMode) return;
        setSelectedGamemode((prevSelectedGamemode) =>
            prevSelectedGamemode === gamemode ? null : gamemode
        );
    };

    const handleQuit = () => {
        setQuitPopup((prevState) => !prevState);
    };

    const kick = () => {
        localStorage.removeItem("playerId");
        localStorage.removeItem("playerToken");
        localStorage.removeItem("lobbyCode");
        navigate("/lobbyoverview");
    };

    const startGame = async () => {
        const config = {
            headers: {
                playerToken: localStorage.getItem("playerToken"),
            },
        };
        try {
            await api.post(`/lobbies/${lobbycode}/games`, {}, config);
        } catch (error) {
            handleError(error, navigate);
        }
    };

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
                            ownerMode={ownerMode}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );

    let playerListContent = (
        <div>
            <p> Currently active players </p>
            <ul className="player list">
                {lobby.players.map((player: Player) => (
                    <li key={player.id}>
                        <div className="player container">
                            <div className="player icon">
                                <img
                                    src={
                                        player.user === null
                                            ? ICONS[hashForAnon(player.name)]
                                            : IMAGES[player.user.profilePicture]
                                    }
                                    alt={"profile picture"}
                                />
                            </div>
                            <div
                                className={
                                    player.id === lobby.owner.id
                                        ? "player name owner"
                                        : "player name"
                                }
                            >
                                {player.id === lobby.owner.id
                                    ? player.name + " (Owner)"
                                    : player.name}
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );

    const handleEdit = () => {
        if (isEditing) {
            updateLobby(lobbyname, null, null, null);
            setIsEditing(false);
        } else {
            setIsEditing(true);
        }
    };

    const editLobbyName = () => {
        if (isEditing) {
            return (
                <input
                    className="input-css"
                    value={lobbyname}
                    onChange={(e) => {
                        setLobbyname(e.target.value);
                    }}
                />
            );
        } else {
            return <span>{lobbyname}</span>;
        }
    };

    const returnPublicStatus = () => {
        if (publicA) return "Public";
        else return "Private";
    };

    const handlePublicButton = () => {
        setPublicA((prevPublicA) => !prevPublicA);
        updateLobby(null, !publicA, null, null);
    };

    const getLabelForValue = (value) =>{
        return timerOptions.find(option => option.value === value).label;
    }

    //Each time toggleTimer is clicked, the toggleTimerTriggered is set to true and the update happens via useEffect
    const toggleTimer = () => {
        setSelectedTimer(
            timerOptions[(selectedTimerIndex + 1) % timerOptions.length].value
        );
        setSelectedTimerIndex(
            (prevIndex) => (prevIndex + 1) % timerOptions.length
        );
        setToggleTimerTriggered(true);
    };

    useEffect(() => {
        if (toggleTimerTriggered) {
            updateLobby(null, null, null, selectedTimer);
            setToggleTimerTriggered(false);
        }

    }, [toggleTimerTriggered]);

    return (
        <div>
            <div>
                <BaseContainer>
                    <div className="lobbypage container">
                        {ownerMode && (
                            <Button
                                className="public-private-button"
                                onClick={handlePublicButton}
                            >
                                {returnPublicStatus()}
                            </Button>
                        )}

                        {ownerMode && (
                            <Button
                                disabled={isUpdating}
                                className="timer-label"
                                onClick={toggleTimer}
                            >
                                Timer: {lobby.gameTime !== 0 ? getLabelForValue(lobby.gameTime) : timerOptions[selectedTimerIndex].label}
                            </Button>
                        )}

                        <h2>
                            {editLobbyName()}
                            {ownerMode && (
                                <Button
                                    className="edit-button"
                                    onClick={handleEdit}
                                >
                                    {isEditing ? "Save" : "Edit"}
                                </Button>
                            )}
                        </h2>
                        <div className="lobbypage game-and-players-container">
                            <div className="gamemode standard">{content}</div>
                            <BaseContainer className="player-list-container">
                                <div>{playerListContent}</div>
                            </BaseContainer>
                        </div>
                        <div className="button-container">
                            <Button
                                className="button-container button"
                                onClick={() => startGame()}
                                disabled={!selectedGamemode || !ownerMode}
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
                        <div>
                            <CopyButton copyText={lobby.code} />
                        </div>
                    </div>
                </BaseContainer>
                {quitPopup && (
                    <LobbyContext.Provider value={{ quitPopup, setQuitPopup }}>
                        <QuitPopup />
                    </LobbyContext.Provider>
                )}
            </div>
        </div>
    );
};

LobbyPage.propTypes = {
    stompWebSocketHook: PropTypes.shape({
        subscribe: PropTypes.func.isRequired,
        unsubscribe: PropTypes.func.isRequired,
        sendMessage: PropTypes.func.isRequired,
        messages: PropTypes.array.isRequired,
        resetMessagesList: PropTypes.func.isRequired,
        connected: PropTypes.bool.isRequired,
        subscriptionsRef: PropTypes.object.isRequired,
    }).isRequired,
};

export default LobbyPage;