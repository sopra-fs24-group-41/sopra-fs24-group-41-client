import React from "react";
import { Button } from "components/ui/Button";
import BaseContainer from "components/ui/BaseContainer";
import "styles/popup-ui/ProfilePopup.scss";
import { useNavigate } from "react-router-dom";

const ProfilePopup = () => {
  const navigate = useNavigate();

  const Logout = () =>{
    localStorage.removeItem("token");
    window.location.reload();
  }

  return (
    <BaseContainer className="profilepopup container">
      <div className="profilepopup button-container">
        <Button onClick={() => navigate("/profile")}>Profile</Button>{" "}
        <Button onClick={() => Logout()}>Logout</Button>
      </div>
    </BaseContainer>
  );
};

export default ProfilePopup;
