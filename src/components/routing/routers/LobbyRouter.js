import React from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import PropTypes from "prop-types";
import Lobby from "../../views/Lobby";

const LobbyRouter = () => {
    return (
        <div style={{display: "flex", flexDirection: "column"}}>
            <Routes>

                <Route path="" element={<Lobby />} />

                <Route path="dashboard" element={<Lobby />} />

                <Route path="*" element={<Navigate to="dashboard" replace />} />

            </Routes>

        </div>
    );
};
/*
* Don't forget to export your component!
 */

LobbyRouter.propTypes = {
    base: PropTypes.string
}

export default LobbyRouter;
