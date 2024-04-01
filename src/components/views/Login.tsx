import React, { useState } from "react";
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

const Login = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState<string>("");
  const [username, setUsername] = useState<string>("");

  const doLogin = () => {
    // try {
    //   // Your login logic goes here

    //   // Placeholder for demonstration
    //   localStorage.setItem("token", "placeHolder");

    //   // Navigate to the route /game after successful login
    //   navigate("/game");
    // } catch (error) {
    //   alert(`Something went wrong during the login: \n${handleError(error)}`);
    // }
    alert("You logged in!");
  };

  return (
    <BaseContainer>
      <div className="login container">
        <form className="login form" onSubmit={() => doLogin}>
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
              onClick={() => doLogin()}
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
