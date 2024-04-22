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
            console.log("Executing delete request");
            await api.delete(`/lobbies/${lobbycode}/players/${playerID}`, config);
            navigate("/lobbyoverview");
        } catch (error) {
            handleError(error);
            alert("It didn't work it seems.");
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
