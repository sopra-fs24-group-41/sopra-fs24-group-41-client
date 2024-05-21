import React, { useEffect, useState } from "react";
import { Button } from "components/ui/Button";
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
import "styles/views/LobbyOverview.scss";
import Lobby from "../../models/Lobby.js";
import Icon from "../ui/Icon";
import LoginRegister from "components/popup-ui/LoginRegister";
import ProfilePopup from "components/popup-ui/ProfilePopup";
import { api, useError } from "helpers/api";
import { useNavigate } from "react-router-dom";

const LobbyItem = ({lobby, onSelect, isSelected}: {
    lobby: Lobby;
    onSelect: (lobby: Lobby) => void;
    isSelected: boolean;
}) => (
    <button
        className={`lobby container${isSelected ? "-selected" : ""}`}
        onClick={() => onSelect(lobby)}
    >
        <label className="lobby lobby-name">{lobby.name}</label>
        <div>
            {lobby.status === "PREGAME" ? "" : "❌"}
        </div>
    </button>
);
LobbyItem.propTypes = {
    lobby: PropTypes.object,
};

const LobbyOverview = ({ stompWebSocketHook }) => {
    const navigate = useNavigate();
    const [lobbies, setLobbies] = useState<Lobby[]>([]);
    const [selectedLobby, setSelectedLobby] = useState<Lobby | null>(null);
    const [loginRegisterPopup, setLoginRegisterPopup] = useState(false);
    const [lobbyCode, setLobbyCode] = useState<string>(null);
    const userToken = localStorage.getItem("userToken");
    const [createWithoutAccount, setCreateWithoutAccount] = useState(false);
    const { handleError, resetError } = useError();
    const [lobbyIngameErrorMsg, setLobbyIngameErrorMsg] = useState("");

    useEffect(() => {
        const fetchLobbies = async () => {
            try {
                const response = await api.get("/lobbies");
                const lobbyData = response.data.map((lobby: any) => new Lobby(lobby));
                setLobbies(lobbyData);
            } catch (error) {
                handleError(error, navigate);
            }
        };
        fetchLobbies();
    }, []);

    // websocket subscription
    useEffect(() => {
        if (stompWebSocketHook.connected.current === true) {
            stompWebSocketHook.subscribe("/topic/lobbies");
        }

        return () => {
            if (stompWebSocketHook.connected.current === true) {
                stompWebSocketHook.unsubscribe("/topic/lobbies");
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
                if (message.instruction === "update_lobby_list")
                    setLobbies(message.data.map((lobby: any) => new Lobby(lobby)));
            });
            stompWebSocketHook.resetMessagesList();
        }
    }, [stompWebSocketHook.messages]);

    // Allows selection / deselection
    const selectLobby = (lobby: Lobby) => {
        setSelectedLobby((prevSelectedLobby) =>
            prevSelectedLobby === lobby ? null : lobby,
        );
        if (lobby === selectedLobby) {
            setLobbyCode("");
        } else {
            setLobbyCode(lobby.code);
        }
    };

    const checkLogin = () => {
        return localStorage.getItem("userToken") !== null;
    };

    const iconClick = () => {
        setLoginRegisterPopup((prevState) => !prevState);
    };

    const joinLobby = async () => {
        if (!checkLogin()) {
            try {
                const lobby = await api.get("/lobbies/" + lobbyCode);
                if (lobby.data.status !== "PREGAME") {
                    setLobbyIngameErrorMsg(lobby.data.name + " is currently ingame");
                    setTimeout(() => setLobbyIngameErrorMsg(""), 3000)

                    return
                }
                navigate("/lobby/" + lobbyCode + "/anonymous");
            } catch (error) {
                handleError(error, navigate);
            }
        } else {
            try {
                const requestBody = {};
                const config = { headers: { userToken: userToken } };
                const response = await api.post("/lobbies/" + lobbyCode + "/players", requestBody, config);
                localStorage.setItem("playerToken", response.data.playerToken);
                localStorage.setItem("playerId", response.data.playerId);
                localStorage.setItem("lobbyCode", lobbyCode);
                navigate("/lobby/" + lobbyCode);
            } catch (error) {
                handleError(error, navigate);
            }
        }
    };

    const createLobby = async () => {
        if (!checkLogin()) {
            setCreateWithoutAccount(true);
            setTimeout(() => setCreateWithoutAccount(false), 2000);

            return;
        }
        try {
            const requestBody = { publicAccess: true };
            const config = { headers: { userToken: userToken } };
            const response = await api.post("/lobbies", requestBody, config);
            const createdLobby = response.data.lobby;
            localStorage.setItem("playerToken", response.data.playerToken);
            localStorage.setItem("playerId", response.data.playerId);
            localStorage.setItem("lobbyCode", createdLobby.code);

            navigate("/lobby/" + createdLobby.code);
        } catch (error) {
            handleError(error, navigate);
        }
    };

    let content;

    if (lobbies) {
        content = (
            <div className="lobbyoverview">
                <ul className="lobbyoverview lobby-list">

                    {lobbies.map((lobby: Lobby) => (
                        <li key={lobby.code}>
                            <LobbyItem
                                lobby={lobby}
                                onSelect={() => selectLobby(lobby)}
                                isSelected={lobby === selectedLobby}
                            />
                        </li>
                    ))}
                </ul>
                <div className="error-message-lobby-ingame">
                    {lobbyIngameErrorMsg}
                </div>
                <div>
                    <p> Or enter a lobby code: </p>
                    <form>
                        <input
                            className={`lobby input-container ${
                                lobbyCode ? "has-input" : ""
                            }`}
                            name="lobbyCode"
                            value={lobbyCode || ""}
                            onChange={(lobbyCode) => {
                                setLobbyCode(lobbyCode.target.value);
                                setSelectedLobby(null);
                                resetError();
                            }}
                            onSubmit={joinLobby}
                        />
                    </form>

                    <div className="login button-container">
                        <Button
                            width="100%"
                            onClick={() => joinLobby()}
                            disabled={!selectedLobby && !lobbyCode}
                        >
                            Join Lobby
                        </Button>
                        <Button
                            width="100%"
                            onClick={() => createLobby()}
                            disabled={selectedLobby || lobbyCode}
                        >
                            Create Lobby
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div>
            <div className="container-wrapper">
                <BaseContainer className="lobbyoverview container">
                    <h2>Lobby Overview</h2>
                    {createWithoutAccount ? (
                        <p className="create_lobby_without_login">
                            Please log in to create a lobby.
                        </p>
                    ) : (
                        <p>Select a Lobby to Join</p>
                    )}
                    {content}
                </BaseContainer>

                {loginRegisterPopup &&
                    localStorage.getItem("userToken") === null && (<LoginRegister />)}
                {loginRegisterPopup &&
                    localStorage.getItem("userToken") !== null && (<ProfilePopup />)}
            </div>
            <Icon onClick={iconClick} wiggle={createWithoutAccount} />
        </div>
    );
};

LobbyOverview.propTypes = {
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

export default LobbyOverview;