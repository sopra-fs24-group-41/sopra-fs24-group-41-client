import React from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import Game from "../../views/GameBoard/Game";
import PropTypes from "prop-types";
import LobbyOverview from "../../views/LobbyOverview"

const LobbyOverviewRouter = () => {
    const playerToken = localStorage.getItem("playerToken");
    const code = localStorage.getItem("code");

    // Check if both playerToken and code are in localStorage
    const inLobby = playerToken && code;

    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            <Routes>
                {/* If yes playerToken, navigate to /lobby/{code} */}
                {inLobby && <Route path="/" element={<Navigate to={`/lobby/${code}`} replace />} />}
                
                {/* Else go to LobbyOverview */}
                <Route path="" element={<LobbyOverview />} />

            </Routes>
        </div>
    );
};
/*
* Don't forget to export your component!
 */

LobbyOverviewRouter.propTypes = {
    base: PropTypes.string
}

export default LobbyOverviewRouter;
