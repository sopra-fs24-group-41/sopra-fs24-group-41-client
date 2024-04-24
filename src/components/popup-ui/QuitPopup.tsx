import React, { useContext } from "react";
import { Button } from "components/ui/Button";
import BaseContainer from "components/ui/BaseContainer";
import "styles/popup-ui/QuitPopup.scss";
import { context } from "../views/Lobby";

const QuitPopup = () => {
    const { setQuitPopup, QuitLobby } = useContext(context);

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
