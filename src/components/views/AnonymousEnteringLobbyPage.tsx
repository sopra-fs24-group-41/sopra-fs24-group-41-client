import React, { useEffect, useState } from "react";
import { Button } from "components/ui/Button";
import PropTypes from "prop-types";
import "styles/views/AnonEnterLobby.scss";
import Lobby from "../../models/Lobby.js";
import { api, handleError } from "helpers/api";
import { useNavigate, useParams} from "react-router-dom";
import BaseContainer from "../ui/BaseContainer";

const FormField = (props) => {
    return (
        <div>
            <label>{props.label}</label>
            <input
                className="login input"
                placeholder="enter here.."
                type={props.type}
                value={props.value}
                onChange={(e) => props.onChange(e.target.value)}
            />
        </div>
    );
};

FormField.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    type: PropTypes.string,
};

const AnonymousEnteringLobbyPage = () => {
    const navigate = useNavigate();
    const params = useParams();
    const lobbyCode = params.lobbycode;
    const [lobby, setLobby] = useState<Lobby[]>([]);
    const [playerName, setPlayerName] = useState<String>("")

    useEffect(() => {
        const fetchLobby = async () => {
            try {
                const response = await api.get("/lobbies/" + lobbyCode);
                const lobbyData = response.data;
                setLobby(lobbyData);
            } catch (error) {
                handleError(error, navigate);
                navigate("/lobbyoverview")
            }
        };
        fetchLobby();
    }, []);

    const joinLobby = async () => {

        try {
            const requestBody = {playerName: playerName};
            const response = await api.post("/lobbies/" + lobbyCode + "/players", requestBody);
            localStorage.setItem("playerToken", response.data.playerToken);
            localStorage.setItem("playerId", response.data.playerId);
            localStorage.setItem("lobbyCode", lobbyCode);
            navigate("/lobby/" + lobbyCode);
        } catch (error) {
            handleError(error, navigate);
        }
    }

    let content = (
        <div>
            <FormField
                label={"Your playername: "}
                value={playerName}
                onChange={(pn: string) => setPlayerName(pn)}
            />
            </div>
    );

    return (
        <div className="container-wrapper">
            <BaseContainer className="lobbyoverview container">
                <h2>Currently joining {lobby.name} as an anonymous user</h2>
                <div className="player input-container">
                    Enter a playername you want to be represented as:
                    {content}
                </div>
                <div className="login button-container">
                    <Button
                        className="button-container button"
                        onClick={() => navigate("/lobbyoverview")}
                    >
                        Back to Overview
                    </Button>

                    <Button
                        width="100%"
                        onClick={() => joinLobby()}
                        disabled={playerName === ""}
                    >
                        Join Lobby
                    </Button>
                </div>

            </BaseContainer>
        </div>
);
}

export default AnonymousEnteringLobbyPage;
