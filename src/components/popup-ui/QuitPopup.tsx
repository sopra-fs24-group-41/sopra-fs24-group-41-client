import React, {useContext} from "react";
import { Button } from "components/ui/Button";
import BaseContainer from "components/ui/BaseContainer";
import "styles/popup-ui/QuitPopup.scss";
import {useNavigate, useParams} from "react-router-dom";
import { context } from "../views/Lobby";
import {api, handleError} from "../../helpers/api";

const QuitPopup = () => {
    const navigate = useNavigate();
    const { quitPopup, setQuitPopup } = useContext(context);
    const params = useParams();
    const lobbycode = params.lobbycode;
    const playerID = localStorage.getItem("playerID");
    const playerToken = localStorage.getItem("playerToken");

    const QuitLobby = async () => {
        try {
            const config = {
                headers: {
                    "playerToken": playerToken.toString()
                }
            };
            await api.delete(`/lobbies/${lobbycode}/players/${playerID}`, config);
            localStorage.removeItem("playerID");
            localStorage.removeItem("playerToken");
            localStorage.removeItem("code");
            navigate("/lobbyoverview");
        } catch (error) {
            handleError(error);
            alert("Something went wrong on the server side, please try again");
        }
    }

    return (
        <BaseContainer className="quitpopup container">
            <h2> Do you want to leave this lobby and quit to the lobby overview?</h2>
            <div className="quitpopup button-container">
                <Button className="button" onClick={() => QuitLobby()}>Yes</Button>{" "}
                <Button className="button" onClick={() => setQuitPopup(false)}>No</Button>
            </div>
        </BaseContainer>
    );
};

export default QuitPopup;
