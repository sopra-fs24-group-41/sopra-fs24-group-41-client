import React from "react";
import { Button } from "components/ui/Button";
import BaseContainer from "components/ui/BaseContainer";
import "styles/views/LoginRegister.scss";
import { useNavigate } from "react-router-dom";

const LoginRegister = () => {
  const navigate = useNavigate();

  return (
    <BaseContainer className="loginregister container">
      <div className="loginregister button-container">
        <Button onClick={() => navigate("/login")}>Login</Button>
        <Button onClick={() => navigate("/registration")}>Sign up</Button>
      </div>
    </BaseContainer>
  );
};

export default LoginRegister;
