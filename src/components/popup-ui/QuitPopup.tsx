import React, { useContext } from "react";
import { Button } from "components/ui/Button";
import BaseContainer from "components/ui/BaseContainer";
import "styles/popup-ui/QuitPopup.scss";
import { context } from "../views/Lobby";
import { api, handleError } from "../../helpers/api.js";
import { useNavigate, useParams } from "react-router-dom";




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
    const { setQuitPopup } = useContext(context);
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
