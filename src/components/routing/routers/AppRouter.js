import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LobbyOverviewRouter from "./LobbyOverviewRouter";
import LobbyRouter from "./LobbyRouter";
import { GameGuard } from "../routeProtectors/GameGuard";
import GameRouter from "./GameRouter";
import { LoginGuard } from "../routeProtectors/LoginGuard";
import Login from "../../views/Login";
import Registration from "../../views/Registration";
import LobbyOverview from "../../views/LobbyOverview";
import Lobby from "../../views/Lobby";
import Profile from "../../views/Profile";
import Result from "../../views/Result";
import Game from "../../views/GameBoard/Game";
import {LobbyGuard} from "../routeProtectors/LobbyGuard";
import StompWebSocketComponent from "../../views/StompWebSocketComponent";
import PropTypes from "prop-types";

/**
 * Main router of your application.
 * In the following class, different routes are rendered. In our case, there is a Login Route with matches the path "/login"
 * and another Router that matches the route "/game".
 * The main difference between these two routes is the following:
 * /login renders another component without any sub-route
 * /game renders a Router that contains other sub-routes that render in turn other react components
 * Documentation about routing in React: https://reactrouter.com/en/main/start/tutorial
 */
const AppRouter = ({ stompWebSocketHook }) => {
    return (
        <BrowserRouter>
            <Routes>

                <Route path="/lobbyoverview/*" element={<LobbyOverviewRouter base="/lobbyoverview"/>} />

                <Route path="/login" element={<Login />} />

                <Route path="/profile" element={<Profile />} />

                <Route path="/registration" element={<Registration />} />

                <Route path="/result" element={<Result />} />

                <Route path="/game" element={<Game />} />

                <Route path="/lobby" element={<LobbyGuard />}>
                    <Route path="/lobby/:lobbycode" element={<Lobby/>} />
                </Route>

                <Route path="/" element={
                    <Navigate to="/lobbyoverview" replace />
                } />

                <Route path="/websocket-demo" element={<StompWebSocketComponent stompWebSocketHook={stompWebSocketHook} />} />

            </Routes>
        </BrowserRouter>
    );
};

AppRouter.propTypes = {
    stompWebSocketHook: PropTypes.object,
};

/*
* Don't forget to export your component!
 */
export default AppRouter;
