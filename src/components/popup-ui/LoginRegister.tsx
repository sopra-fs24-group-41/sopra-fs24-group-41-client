import React from "react";
import { Button } from "components/ui/Button";
import BaseContainer from "components/ui/BaseContainer";
import "styles/popup-ui/LoginRegister.scss";
import { useNavigate } from "react-router-dom";
import Info from "components/views/Info";

const LoginRegister = () => {
    const navigate = useNavigate();

    return (
        <BaseContainer className="loginregister container">
            <div className="loginregister button-container">
                <Button onClick={() => navigate("/login")}>Login</Button>
                <Button onClick={() => navigate("/registration")}>Sign up</Button>
                <Button onClick={() => navigate("/info")}>Info</Button>
            </div>
        </BaseContainer>
    );
};

export default LoginRegister;
