import React from "react";
import { Button } from "components/ui/Button";
import BaseContainer from "components/ui/BaseContainer";
import "styles/popup-ui/ProfilePopup.scss";
import { useNavigate } from "react-router-dom";
import { api, useError } from "helpers/api";


const ProfilePopup = () => {
    const navigate = useNavigate();
    const { handleError } = useError();

    const doLogout = async () => {
        try {
            const token = localStorage.getItem("userToken");
            const requestBody = JSON.stringify({ token });
            await api.post("/logouts", requestBody);
            localStorage.removeItem("userToken");
            localStorage.removeItem("userId");
            navigate("/login");
        } catch (error) {
            if (error.response && error.response.status === 404) {
                console.log("server did not know the user, logged out anyway");
            } else {
                alert(`Something went wrong during the logout: \n${handleError(error, navigate)}`);
            }
            localStorage.removeItem("userToken");
            localStorage.removeItem("userId")
            window.location.reload();
        }
    };

    return (
        <BaseContainer className="profilepopup container">
            <div className="profilepopup profile-button-container">
                <Button onClick={() => navigate("/profile")}>Profile</Button>{" "}
                <Button onClick={() => navigate("/info")}>Info</Button>
                <Button onClick={() => navigate("/achievements")}>Achievements</Button>{" "}
                <Button onClick={() => navigate("/leaderboard")}>Leaderboard</Button>{" "}
                <Button onClick={() => doLogout()}>Logout</Button>
            </div>
        </BaseContainer>
    );
};

export default ProfilePopup;
