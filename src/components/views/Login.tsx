import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api, handleError } from "helpers/api";
import User from "models/User";
import { Button } from "components/ui/Button";
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
import "styles/views/Login.scss";

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

const Login = () => {
    const navigate = useNavigate();
    const [password, setPassword] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [loginError, setLoginError] = useState(false);
    const [loginErrorMsg, setLoginErrorMsg] = useState("");

    
    const doLogin = async () => {
        try {
            const requestBodyLogin = JSON.stringify({ username, password });
            const responseLogin = await api.post("/logins", requestBodyLogin);
            // Get the returned user and update a new object.
            const user = new User(responseLogin.data);
            // Store the token into the local storage.
            localStorage.setItem("userId", user.id);
            localStorage.setItem("userToken", user.token);
            navigate("/lobbyoverview");
        } catch (error) {
            setLoginErrorMsg(error.response.data.message);
            setLoginError(true);
        }
    };


    return (
        <BaseContainer>
            <div className="login container">
                <form className="login form" onSubmit={(e) => {e.preventDefault(), doLogin();}}>
                    <FormField
                        label="Username"
                        value={username}
                        onChange={(un: string) => {
                            setUsername(un);
                            setLoginError(false);
                        }}
                        error={loginError}
                    />
                    <FormField
                        label="Password"
                        value={password}
                        onChange={(pw: string) => {
                            setPassword(pw);
                            setLoginError(false);
                        }}
                        type="password"
                        error={loginError}
                    />
                    {loginError && <p className="error-message">{loginErrorMsg}</p>}
                    <div className="login button-container">
                        <Button
                            disabled={!username || !password}
                            width="100%"
                            type="submit"
                        >
                            Login
                        </Button>

                        <Button
                            disabled={username && password}
                            width="100%"
                            onClick={() => navigate("/registration")}
                        >
                            <span style={{ fontSize: "16px" }}>
                            No account? Sign up here
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

export default Login;
