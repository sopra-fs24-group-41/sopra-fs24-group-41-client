import React from "react";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {GameGuard} from "../routeProtectors/GameGuard";
import GameRouter from "./GameRouter";
import {LoginGuard} from "../routeProtectors/LoginGuard";
import Login from "../../views/Login";
import Registration from "../../views/Registration";
import LobbyOverview from "../../views/LobbyOverview"
import Lobby from "../../views/Lobby";
import Profile from "../../views/Profile";
import Result from "../../views/Result";
import Game from "../../views/GameBoard/Game";


/**
 * Main router of your application.
 * In the following class, different routes are rendered. In our case, there is a Login Route with matches the path "/login"
 * and another Router that matches the route "/game".
 * The main difference between these two routes is the following:
 * /login renders another component without any sub-route
 * /game renders a Router that contains other sub-routes that render in turn other react components
 * Documentation about routing in React: https://reactrouter.com/en/main/start/tutorial
 */
const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>

                <Route path="/lobbyoverview/*" element={<GameRouter base="/lobbyoverview"/>} />

                <Route path="/login" element={<Login/>} />

                <Route path="/profile" element={<Profile/>} />

                <Route path="/registration" element={<Registration/>} />

                <Route path="/result" element={<Result/>} />

                <Route path="/game" element={<Game/>} />

                <Route path="/lobby" element={<Lobby/>}>
                    <Route path="/lobby/:lobbyID" element={<Lobby/>} />
                </Route>

                <Route path="/" element={
                    <Navigate to="/lobbyoverview" replace />
                }/>

            </Routes>
        </BrowserRouter>
    );
};

/*
* Don't forget to export your component!
 */
export default AppRouter;
