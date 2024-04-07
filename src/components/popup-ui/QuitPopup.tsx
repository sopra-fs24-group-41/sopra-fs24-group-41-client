import React, {useContext} from "react";
import { Button } from "components/ui/Button";
import BaseContainer from "components/ui/BaseContainer";
import "styles/popup-ui/QuitPopup.scss";
import { useNavigate } from "react-router-dom";
import { context } from "../views/Lobby"

const QuitPopup = () => {
    const navigate = useNavigate();
    const { quitPopup, setQuitPopup } = useContext(context);


    return (
        <BaseContainer className="quitpopup container">
            <h2> Do you want to leave this lobby and quit to the lobby overview?</h2>
            <div className="quitpopup button-container">
                <Button className="button" onClick={() => setQuitPopup(false)}>No</Button>
                <Button className="button" onClick={() => navigate("/lobbyoverview")}>Yes</Button>{" "}
            </div>
        </BaseContainer>
    );
};

export default QuitPopup;
