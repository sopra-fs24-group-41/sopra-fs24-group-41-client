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
import { api, useError } from "../../helpers/api.js";
import IMAGES from "../../assets/images/index1.js";
import ICONS from "../../assets/icons/index.js";
import hashForAnon from "../../helpers/utils";

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

const LobbyPage = ({ stompWebSocketHook }) => {
    const [selectedGamemode, setSelectedGamemode] = useState<Gamemode>(null);
    const [quitPopup, setQuitPopup] = useState(false);
    const [lobby, setLobby] = useState<Lobby>({ players: [] });
    const [ownerMode, setOwnerMode] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [lobbyname, setLobbyname] = useState();
    const [publicA, setPublicA] = useState();
    const [selectedTimer, setSelectedTimer] = useState(timerOptions[0].value);
    const { handleError } = useError();
    const navigate = useNavigate();
    const params = useParams();
    const lobbyCode = params.lobbycode;
    const [editError, setEditError] = useState(false);
    const { resetError } = useError();

    useEffect(() => {
        // Fetch lobby and players data
        const fetchLobbyAndPlayers = async () => {
            try {
                const response = await api.get("/lobbies/" + lobbyCode);
                let lobbyData = new Lobby(response.data);
                setLobby(lobbyData);
                if (
                    lobbyData.owner.id ===
                    Number(localStorage.getItem("playerId"))
                )
                    setOwnerMode(true);
                if (lobbyData.status === "INGAME") { navigate("/lobby/game"); }
            } catch (error) {
                handleError(error, navigate);
                kick();
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

    // websocket subscription
    useEffect(() => {
        if (stompWebSocketHook.connected.current === true) {
            stompWebSocketHook.subscribe(`/topic/lobbies/${lobbyCode}`);
            stompWebSocketHook.subscribe(`/topic/lobbies/${lobbyCode}/game`);
        }

        return () => {
            if (stompWebSocketHook.connected.current === true) {
                stompWebSocketHook.unsubscribe(`/topic/lobbies/${lobbyCode}`);
                stompWebSocketHook.unsubscribe(
                    `/topic/lobbies/${lobbyCode}/game`
                );
            }
            stompWebSocketHook.resetMessagesList();
        };
    }, [stompWebSocketHook.connectedTrigger]);

    // websocket message interpretation
    useEffect(() => {
        let messagesLength = stompWebSocketHook.messages.length;
        if (messagesLength > 0) {
            const messagesList = stompWebSocketHook.messages;
            messagesList.forEach((message) => {
                if (message.instruction === "update_lobby") {
                    setLobby(new Lobby(message.data));
                }
                if (message.instruction === "start") {
                    navigate("/lobby/game");
                }
                if (message.instruction === "kick") {
                    console.log("kicked because: ", message.reason); // replace with showing message
                    kick();
                }
            });
            stompWebSocketHook.resetMessagesList();
        }
    }, [stompWebSocketHook.messages]);

    useEffect(() => {
        const playerId = localStorage.getItem("playerId");
        const playerToken = localStorage.getItem("playerToken");
        const handleTabClose = async () => {
            const config = {
                headers: {playerToken: playerToken},
            };
            try {
                kick();
                await api.delete("/lobbies/" + lobbyCode + "/players/" + playerId , config);
            } catch (error) {
                handleError(error);
                kick();
            }
        }
        window.addEventListener("beforeunload", handleTabClose);

        return () => {
            window.removeEventListener("beforeunload", handleTabClose);
        };
    }, []);

    const updateLobby = async (
        name: string,
        publicAccess: boolean,
        mode: string,
        gameTime: number
    ) => {
        if (!ownerMode) return;

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
            await api.put(`/lobbies/${lobbyCode}`, body, config);

            return true;
        } catch (error) {
            handleError(error);
            setEditError(true);

            return false;
        }
    };

    const selectGamemode = (gamemode: Gamemode) => {
        if (gamemode !== selectedGamemode)
            updateLobby(null, null, gamemode.serverName, null);
        if (!ownerMode) return;
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
            await api.post(`/lobbies/${lobbyCode}/games`, {}, config);
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

    const handleEdit = async () => {
        if (isEditing) {
            const updateSuccessful = await updateLobby(
                lobbyname,
                null,
                null,
                null
            );
            if (updateSuccessful) {
                setIsEditing(false);
            }
        } else {
            setIsEditing(true);
        }
    };

    const editLobbyName = () => {
        if (isEditing) {
            return (
                <input
                    className={`input-css ${editError ? "error" : ""}`}
                    value={lobbyname}
                    onChange={(e) => {
                        setLobbyname(e.target.value);
                        setEditError(false);
                        resetError();
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

    const selectionTimer = () => {
        return (
            <select
                className="timer-label"
                value={selectedTimer}
                onChange={(e) => setSelectedTimer(e.target.value)}
            >
                {timerOptions.map((option, index) => (
                    <option
                        className="option-label"
                        key={index}
                        value={option.value}
                    >
                        {"Timer: " + option.label}
                    </option>
                ))}
            </select>
        );
    };

    useEffect(() => {
        if (selectedTimer) {
            updateLobby(null, null, null, selectedTimer);
        }
    }, [selectedTimer]);

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

                        {ownerMode && selectionTimer()}

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
                        <div className="lobby-button-container">
                            <Button
                                className="lobby-button-container button"
                                onClick={() => startGame()}
                                disabled={!selectedGamemode || !ownerMode}
                            >
                                Start Game
                            </Button>
                            <Button
                                className="lobby-button-container button"
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
        connected: PropTypes.object.isRequired,
        subscriptionsRef: PropTypes.object.isRequired,
        connectedTrigger: PropTypes.bool.isRequired,
    }).isRequired,
};

export default LobbyPage;
