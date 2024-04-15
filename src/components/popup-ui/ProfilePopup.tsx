import React from "react";
import { Button } from "components/ui/Button";
import BaseContainer from "components/ui/BaseContainer";
import "styles/popup-ui/ProfilePopup.scss";
import { useNavigate } from "react-router-dom";
import { api, handleError } from "helpers/api";
import User from "models/User";


const ProfilePopup = () => {
    const navigate = useNavigate();

    const doLogout = async () => {
        try {
            const token = localStorage.getItem("token");
            const requestBody = JSON.stringify({ token });
            console.log(requestBody);
            await api.post("/logouts", requestBody);
            localStorage.removeItem("token");
            navigate("/login");
        } catch (error) {
            if (error.response && error.response.status === 404) {
                alert("Logout endpoint not found, the server was restarted");
            } else {
                alert(`Something went wrong during the logout: \n${handleError(error)}`);
            }
            localStorage.removeItem("token");
            window.location.reload();
        }
    };

    return (
        <BaseContainer className="profilepopup container">
            <div className="profilepopup button-container">
                <Button onClick={() => navigate("/profile")}>Profile</Button>{" "}
                <Button onClick={() => doLogout()}>Logout</Button>
            </div>
        </BaseContainer>
    );
};

export default ProfilePopup;
