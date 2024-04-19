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
                const response = await api.get("/lobbies/");
                const lobbyData = response.data.map(lobby => new Lobby(lobby));
                console.log(lobbyData);
                setLobbies(lobbyData);

            } catch (error) {
                alert("Unable to display lobby data");
            }
        };
        fetchLobbies();
    }, []);

    //Allows selection / deselection
    const selectLobby = (lobby: Lobby) => {
        setSelectedLobby((prevSelectedLobby) =>
            prevSelectedLobby === lobby ? null : lobby
        );
        setLobbyCode(lobby.lobbyCode);
    };

    const iconClick = () => {
        setLoginRegisterPopup((prevState) => !prevState);
    };

    const joinLobby = async () => {

        try {
            const requestbody = [];

            /* For some reason it is necessary to make the post request with
             * a requestbody, if i leave it out, the post request returns an error. */

            const config = {headers: {userToken: userToken}};
            const response = await api.post("/lobbies/" + lobbyCode + "/players", requestbody, config);
            console.log(response);
            navigate("/lobby/" + lobbyCode)
        } catch (error) {
            handleError(error);
            alert(("Unable to join lobby with lobbycode: " + lobbyCode));
        }
    }

    const  createLobby = async () => {

        try {
            const requestbody = {"anonymous" : false}
            const config = {headers: {userToken: userToken}}
            const response = await api.post("/lobbies", requestbody, config);
            const createdLobby = response.data.lobby;
            console.log(createdLobby);

            navigate("/lobby/" + createdLobby.code);
        }     catch (error) {
            handleError(error)
            alert("There was en error creating your lobby, check the log for details");
        }
    }

    let content;

    if (lobbies !== []) {
        console.log(lobbies)
        content = (

            <div className="lobbyoverview">
                <ul className="lobbyoverview lobby-list">
                    {lobbies.map((lobby: Lobby) => (
                        <li key={lobby.lobbyName}>
                            <LobbyItem
                                lobby={lobby}
                                onSelect= {() => {
                                    selectLobby(lobby)
                                    setLobbyCode(lobby.code)}}
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
