import React, { useState } from "react";
import { api, handleError } from "helpers/api";
import User from "models/User";
import { useNavigate } from "react-router-dom";
import { Button } from "components/ui/Button";
import "styles/views/Login.scss";
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";

/*
It is possible to add multiple components inside a single file,
however be sure not to clutter your files with an endless amount!
As a rule of thumb, use one file per component and only add small,
specific components that belong to the main one in the same file.
 */
const FormField = (props) => {
    return (
        <div className="login field">
            <label className="login label">{props.label}</label>
            <input
                className="login input"
                placeholder="enter here.."
                type={props.type}
                value={props.value}
                onChange={(e) => props.onChange(e.target.value)}
            />
        </div>
    );
};

FormField.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    type: PropTypes.string,
};

const Registration = () => {
    const navigate = useNavigate();
    const [password, setPassword] = useState<string>("");
    const [username, setUsername] = useState<string>("");

    const doRegistration = async () => {
        try {
            const requestBodyRegistration = JSON.stringify({ username, password });
            const responseRegistration = await api.post(
                "/users",
                requestBodyRegistration
            );
            console.log(responseRegistration.data);
            const requestBodyLogin = JSON.stringify({ username, password });
            const responseLogin = await api.post("/logins", requestBodyLogin);
            // Get the returned user and update a new object.
            const user = new User(responseLogin.data);
            // Store the token into the local storage.
            localStorage.setItem("username", user.username);
            localStorage.setItem("token", user.token);

            // Login successfully worked --> navigate to the route /game in the GameRouter
            navigate("/lobbyoverview");
        } catch (error) {
            alert(
                `Something went wrong during the registration: \n${handleError(error)}`
            );
        }
    };

    return (
        <BaseContainer>
            <div className="login container">
                <form className="login form" onSubmit={(e) => {
                    e.preventDefault(), doRegistration();}}>
                    <FormField
                        label="Username"
                        value={username}
                        onChange={(un: string) => setUsername(un)}
                    />
                    <FormField
                        label="Password"
                        value={password}
                        onChange={(pw) => setPassword(pw)}
                        type="password"
                    />
                    <div className="login button-container">
                        <Button
                            disabled={!username || !password}
                            width="100%"
                            type="submit"
                        >
                            Sign up
                        </Button>

                        <Button
                            disabled={username && password}
                            width="100%"
                            onClick={() => navigate("/login")}
                        >
                            <span style={{ fontSize: "16px" }}>
                            Already signed up? Login here
                            </span>
                        </Button>
                    </div>
                    <div className="login return-button-container">
                        <Button onClick={() => navigate("/lobbyoverview")}>
                            Return to Lobby Overview
                        </Button>
                    </div>
                </form>
            </div>
        </BaseContainer>
    );
};

/**
 * You can get access to the history object's properties via the useLocation, useNavigate, useParams, ... hooks.
 */
export default Registration;
