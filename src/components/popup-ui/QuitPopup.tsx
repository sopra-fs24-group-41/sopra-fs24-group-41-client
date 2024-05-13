import React, { useContext } from "react";
import { Button } from "components/ui/Button";
import BaseContainer from "components/ui/BaseContainer";
import "styles/popup-ui/QuitPopup.scss";
import { LobbyContext } from "../views/Lobby";
import { GameContext } from "components/views/GameBoard/Game";
import { api, handleError } from "../../helpers/api.js";
import { useNavigate } from "react-router-dom";


const QuitPopup = () => {

    const navigate = useNavigate();


    const Quit = async () => {
        try {
            const config = {
                headers: {
                    "playerToken": localStorage.getItem("playerToken").toString(),
                },
            };
            const lobbycode = localStorage.getItem("lobbyCode");
            await api.delete(`/lobbies/${lobbycode}/players/${localStorage.getItem("playerId")}`, config);
            kick();
        } catch (error) {
            handleError(error, navigate);
            alert("Something went wrong on the server side, please try again");
        }
    };
    
    const kick = () => {
        localStorage.removeItem("playerId");
        localStorage.removeItem("playerToken");
        localStorage.removeItem("lobbyCode");
        navigate("/lobbyoverview");
    };

    const lobbyContext = useContext(LobbyContext)
    const gameContext = useContext(GameContext)
    const setQuitPopup = lobbyContext ? lobbyContext.setQuitPopup : gameContext.setQuitPopup;


    return (
        <BaseContainer className="quitpopup container">
            <h2> Do you want to leave this lobby and quit to the lobby overview?</h2>
            <div className="quitpopup button-container">
                <Button className="button" onClick={() => Quit()}>Yes</Button>{" "}
                <Button className="button" onClick={() => setQuitPopup(false)}>No</Button>
            </div>
        </BaseContainer>
    );
};

export default QuitPopup;
