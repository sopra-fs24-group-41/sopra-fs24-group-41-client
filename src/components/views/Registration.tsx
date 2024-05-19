import React, { useState } from "react";
import { api } from "helpers/api";
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
                className={`login input ${props.error ? "error" : ""}`}
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
    error: PropTypes.bool,
};

const Registration = () => {
    const navigate = useNavigate();
    const [password, setPassword] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [registerError, setRegisterError] = useState(false);
    const [registerErrorMsg, setRegisterErrorMsg] = useState("");

    const doRegistration = async () => {
        try {
            const requestBodyRegistration = JSON.stringify({
                username,
                password,
            });
            const responseRegistration = await api.post(
                "/users",
                requestBodyRegistration
            );
            const requestBodyLogin = JSON.stringify({ username, password });
            const responseLogin = await api.post("/logins", requestBodyLogin);
            // Get the returned user and update a new object.
            const user = new User(responseLogin.data);
            // Store the token into the local storage.
            localStorage.setItem("userId", user.id);
            localStorage.setItem("userToken", user.token);

            // Login successfully worked --> navigate to the route /game in the GameRouter
            navigate("/lobbyoverview");
        } catch (error) {
            setRegisterErrorMsg(error.response.data.message);
            setRegisterError(true);
        }
    };

    return (
        <BaseContainer>
            <div className="login container">
                <form
                    className="login form"
                    onSubmit={(e) => {
                        e.preventDefault(), doRegistration();
                    }}
                >
                    <h2>Registration</h2>

                    <FormField
                        label="Username"
                        value={username}
                        onChange={(un: string) => {
                            setUsername(un);
                            setRegisterError(false);
                            setRegisterErrorMsg(" ");
                        }}
                        error={registerError}
                    />
                    <FormField
                        label="Password"
                        value={password}
                        onChange={(pw) => {
                            setPassword(pw);
                            setRegisterError(false);
                            setRegisterErrorMsg(" ");
                        }}
                        type="password"
                        error={registerError}
                    />
                    {<p className="error-message-login">{registerErrorMsg}</p>}
                    <div className="login button-container">
                        <Button
                            disabled={!username || !password}
                            width="100%"
                            type="submit"
                        >
                            Sign up
                        </Button>

                        <Button width="100%" onClick={() => navigate("/login")}>
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