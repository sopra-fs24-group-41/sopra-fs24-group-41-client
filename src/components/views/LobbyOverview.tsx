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

const LobbyOverview = () => {
    const navigate = useNavigate();
    const [lobbies, setLobbies] = useState<Lobby[]>([]);
    const [selectedLobby, setSelectedLobby] = useState<Lobby | null>(null);
    const [LoginRegisterPopup, setLoginRegisterPopup] = useState(false);
    const [lobbyCode, setLobbyCode] = useState<String>(null);
    const userToken = localStorage.getItem("token");


    useEffect(() => {
        const fetchLobbies = async () => {

            try {
                const response = await api.get("/lobbies");
                const lobbyData = response.data.map(lobby => new Lobby(lobby));
                setLobbies(lobbyData);

            } catch (error) {
                handleError(error);
                alert(handleError(error));
            }
        };
        fetchLobbies();
    }, []);

    //Allows selection / deselection
    const selectLobby = (lobby: Lobby) => {
        setSelectedLobby((prevSelectedLobby) =>
            prevSelectedLobby === lobby ? null : lobby
        );
        if (lobby === selectedLobby) {
            setLobbyCode("");
        } else {
            setLobbyCode(lobby.code);
        }
    };

    const iconClick = () => {
        setLoginRegisterPopup((prevState) => !prevState);
    };

    const joinLobby = async () => {

        try {
            const requestbody = [];
            const config = {headers: {userToken: userToken}};
            const response = await api.post("/lobbies/" + lobbyCode + "/players", requestbody, config);
            navigate("/lobby/" + lobbyCode);
            localStorage.setItem("playerToken", response.data.playerToken);
            localStorage.setItem("playerID", response.data.playerId);
        } catch (error) {
            handleError(error);
            alert(handleError(error));
        }
    }

    const  createLobby = async () => {

        try {
            const requestbody = {"anonymous" : false}
            const config = {headers: {userToken: userToken}}
            const response = await api.post("/lobbies", requestbody, config);
            const createdLobby = response.data.lobby;
            localStorage.setItem("playerToken", response.data.playerToken);
            localStorage.setItem("playerID", response.data.playerId);
            localStorage.setItem("code", createdLobby.code);

            navigate("/lobby/" + createdLobby.code);
        }     catch (error) {
            handleError(error)
            alert(handleError(error))
        }
    }

    let content;

    if (lobbies) {
        content = (
            <div className="lobbyoverview">
                <ul className="lobbyoverview lobby-list">
                    {lobbies.map((lobby: Lobby) => (
                        <li key={lobby.code}>
                            <LobbyItem
                                lobby={lobby}
                                onSelect= {() => selectLobby(lobby)}
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
                                setSelectedLobby(null)
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
        ); }
    else {
        content = (
            <div className="lobbyoverview">
                <p color="red">Currently no open lobbies</p>
            </div>
        )}


    return (
        <div className="container-wrapper">
            <BaseContainer className="lobbyoverview container">
                <h2>Lobby Overview</h2>
                <p>Select a Lobby to Join</p>
                {content}
            </BaseContainer>
            <Icon onClick={() => iconClick()} />
            {LoginRegisterPopup && localStorage.getItem("token") === null && (
                <LoginRegister />
            )}
            {LoginRegisterPopup && localStorage.getItem("token") !== null && (
                <ProfilePopup />
            )}
        </div>
    );
    
}

export default LobbyOverview;
