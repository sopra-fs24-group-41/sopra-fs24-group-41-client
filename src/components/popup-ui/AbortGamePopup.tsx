import React, { useContext } from "react";
import { Button } from "components/ui/Button";
import BaseContainer from "components/ui/BaseContainer";
import "styles/popup-ui/QuitPopup.scss";
import { GameContext } from "components/views/GameBoard/Game";
import { api, useError } from "../../helpers/api.js";
import { useNavigate } from "react-router-dom";


const AbortGamePopup = () => {
    const lobbyCode = localStorage.getItem("lobbyCode");
    const playerToken = localStorage.getItem("playerToken");
    const navigate = useNavigate();
    const { handleError } = useError();

    const handleAbortGame = async () => {
        const config = {
            headers: { playerToken: playerToken },
        };
        try {
            await api.delete("/lobbies/" + lobbyCode + "/games", config);
            navigate("/lobbies/" + lobbyCode)
        } catch (error) {
            handleError(error);
            navigate("/lobbies/" + lobbyCode)
        }
    };

    const gameContext = useContext(GameContext)
    const setAbortGamePopup = gameContext.setAbortGamePopup;

    return (
        <BaseContainer className="quitpopup container">
            <h2> Do you want to abort this game and return back to your lobby?</h2>
            <div className="quitpopup button-container">
                <Button className="button" onClick={() => handleAbortGame()}>Yes</Button>{" "}
                <Button className="button" onClick={() => setAbortGamePopup(false)}>No</Button>
            </div>
        </BaseContainer>
    );
};

export default AbortGamePopup;
