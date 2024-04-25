import React, { useEffect, useState } from "react";
import { Button } from "components/ui/Button";
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
import "styles/views/LobbyOverview.scss";
import Lobby from "../../models/Lobby.js";
import Icon from "../ui/Icon";
import LoginRegister from "components/popup-ui/LoginRegister";
import ProfilePopup from "components/popup-ui/ProfilePopup";
import { api, handleError } from "helpers/api";
import { useNavigate } from "react-router-dom";

const LobbyItem = ({ lobby, onSelect, isSelected }: {
    lobby: Lobby;
    onSelect: (lobby: Lobby) => void;
    isSelected: boolean;
}) => (
    <div
        className={`lobby container${isSelected ? "-selected" : ""}`}
        onClick={() => onSelect(lobby)}
    >
        <div className="lobby lobby-name">{lobby.name}</div>
    </div>
);
LobbyItem.propTypes = {
    lobby: PropTypes.object,
};

const LobbyOverview = ({ stompWebSocketHook }) => {
    const navigate = useNavigate();
    const [lobbies, setLobbies] = useState<Lobby[]>([]);
    const [selectedLobby, setSelectedLobby] = useState<Lobby | null>(null);
    const [LoginRegisterPopup, setLoginRegisterPopup] = useState(false);
    const [lobbyCode, setLobbyCode] = useState<String>(null);
    const userToken = localStorage.getItem("userToken");

    useEffect(() => {
        const fetchLobbies = async () => {
            try {
                const response = await api.get("/lobbies");
                const lobbyData = response.data.map((lobby: any) => new Lobby(lobby));
                setLobbies(lobbyData);
            } catch (error) {
                handleError(error);
                alert(handleError(error));
            }
        };
        fetchLobbies();
    }, []);

    useEffect(() => {
        if (stompWebSocketHook.connected === true) {
            stompWebSocketHook.subscribe("/topic/lobbies");
        }

        return () => {
            if (stompWebSocketHook.connected === true) {
                stompWebSocketHook.unsubscribe("/topic/lobbies");
            }
            stompWebSocketHook.resetMessagesList();
        };
    }, [stompWebSocketHook.connected]);

    useEffect(() => {
        let messagesLength = stompWebSocketHook.messages.length;
        if (messagesLength > 0 && stompWebSocketHook.messages[messagesLength - 1] !== undefined) {
            const lobbyDataRAW = stompWebSocketHook.messages[messagesLength - 1];
            if (Array.isArray(lobbyDataRAW)) setLobbies(lobbyDataRAW.map((lobby: any) => new Lobby(lobby)));
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
        const token = localStorage.getItem("userToken");
        if (token === null) {
            alert("Please login to gain further access");

            return false;
        }
        
        return true;
    };


    const iconClick = () => {
        setLoginRegisterPopup((prevState) => !prevState);
    };

    const joinLobby = async () => {
        if (!checkLogin()) {
            return; // Stop execution if the user is not logged in
        }
        try {
            const requestbody = [];
            const config = { headers: { userToken: userToken } };
            const response = await api.post("/lobbies/" + lobbyCode + "/players", requestbody, config);
            localStorage.setItem("playerToken", response.data.playerToken);
            localStorage.setItem("playerId", response.data.playerId);
            navigate("/lobby/" + lobbyCode);
        } catch (error) {
            handleError(error);
            alert(handleError(error));
        }
    };

    const createLobby = async () => {
        if (!checkLogin()) {
            return; // Stop execution if the user is not logged in
        }
        try {
            const requestBody = { "publicAccess": true };
            const config = { headers: { userToken: userToken } };
            const response = await api.post("/lobbies", requestBody, config);
            const createdLobby = response.data.lobby;
            localStorage.setItem("playerToken", response.data.playerToken);
            localStorage.setItem("playerId", response.data.playerId);
            localStorage.setItem("lobbyCode", createdLobby.code);

            navigate("/lobby/" + createdLobby.code);
        } catch (error) {
            handleError(error);
            alert(handleError(error));
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
                <div>
                    <p> Or enter a lobby code: </p>
                    <form>
                        <input
                            className={`lobby input-container ${lobbyCode ? "has-input" : ""}`}
                            name="lobbyCode"
                            value={lobbyCode || ""}
                            onChange={(lobbyCode) => {
                                setLobbyCode(lobbyCode.target.value);
                                setSelectedLobby(null);
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
    } else {
        content = (
            <div className="lobbyoverview">
                <p color="red">Currently no open lobbies</p>
            </div>
        );
    }


    return (
        <div className="container-wrapper">
            <BaseContainer className="lobbyoverview container">
                <h2>Lobby Overview</h2>
                <p>Select a Lobby to Join</p>
                {content}
            </BaseContainer>
            <Icon onClick={() => iconClick()} />
            {LoginRegisterPopup && localStorage.getItem("userToken") === null && (
                <LoginRegister />
            )}
            {LoginRegisterPopup && localStorage.getItem("userToken") !== null && (
                <ProfilePopup />
            )}
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
        connected: PropTypes.bool.isRequired,
        subscriptionsRef: PropTypes.object.isRequired,
    }).isRequired,
};

export default LobbyOverview;
