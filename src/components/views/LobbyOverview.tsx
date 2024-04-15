import React, { useEffect, useState } from "react";
import { Spinner } from "components/ui/Spinner";
import { Button } from "components/ui/Button";
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
import "styles/views/LobbyOverview.scss";
import { Lobby } from "types";
import Icon from "../ui/Icon";
import LoginRegister from "components/popup-ui/LoginRegister";
import ProfilePopup from "components/popup-ui/ProfilePopup";

const LobbyItem = ({ lobby, onSelect, isSelected }: {
    lobby: Lobby;
    onSelect: (lobby: Lobby) => void;
    isSelected: boolean;
}) => (
    <div
        className={`lobby container${isSelected ? "-selected" : ""}`}
        onClick={() => onSelect(lobby)}
    >
        <div className="lobby lobby-name">{lobby.lobbyName}</div>
    </div>
);
LobbyItem.propTypes = {
    lobby: PropTypes.object,
};

const LobbyOverview = () => {
    const [lobbies, setLobbies] = useState<Lobby[]>(null);
    const [selectedLobby, setSelectedLobby] = useState<Lobby | null>(null);
    const [LoginRegisterPopup, setLoginRegisterPopup] = useState(false);
    const [lobbyCode, setLobbyCode] = useState<String>(null);

    useEffect(() => {
        //Dummy stand in, should be replaced.
        const fetchLobbies = async () => {
            setTimeout(() => {
                const dummyLobbies: Lobby[] = [
                    { lobbyName: "Lobby 1", code: "ABC123" },
                    { lobbyName: "Lobby 2", code: "DEF456" },
                    { lobbyName: "Lobby 3", code: "GHI789" }
                ];
                setLobbies(dummyLobbies);
            }, 1000); // Simulated delay of 1 second
        };
        fetchLobbies();
    }, []);

    //Allows selection / deselection
    const selectLobby = (lobby: Lobby) => {
        setSelectedLobby((prevSelectedLobby) =>
            prevSelectedLobby === lobby ? null : lobby
        );
        setLobbyCode(null);
    };
    /*
    1. Take previous input
    2. Verify if previous input === current input: If yes, set lobby to null
    3. Else, set lobby to the current lobby*/

    const iconClick = () => {
        setLoginRegisterPopup((prevState) => !prevState);
    };

    const joinLobby = () => {

        if (lobbyCode) {
            alert("Joining a lobby through entering a lobby code");
        }
        else if (selectedLobby) {
            alert("Joining a lobby through selection");
        }
    }

    const createLobby = () => {
        alert("Creating lobbies is to be implemented!");
    }
    let content = <Spinner />;

    if (lobbies) {
        content = (
            <div className="lobbyoverview">
                <ul className="lobbyoverview lobby-list">
                    {lobbies.map((lobby: Lobby) => (
                        <li key={lobby.lobbyName}>
                            <LobbyItem
                                lobby={lobby}
                                onSelect={selectLobby}
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
                                setSelectedLobby(null)}}
                            onSubmit={joinLobby}
                        />
                    </form>

                    <div className="login button-container">
                        <Button
                            width="100%"
                            onClick={() => joinLobby()}
                            disabled={!selectedLobby && !lobbyCode }
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
};

export default LobbyOverview;
