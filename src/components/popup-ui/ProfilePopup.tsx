import React from "react";
import { Button } from "components/ui/Button";
import BaseContainer from "components/ui/BaseContainer";
import "styles/popup-ui/ProfilePopup.scss";
import { useNavigate } from "react-router-dom";
import { api, handleError } from "helpers/api";
import Typeappear from "components/views/Explanations/Typeappear";
import PropTypes from "prop-types";


const ProfilePopup = () => {
    const navigate = useNavigate();

    const doLogout = async () => {
        try {
            const token = localStorage.getItem("userToken");
            const requestBody = JSON.stringify({ token });
            await api.post("/logouts", requestBody);
            localStorage.removeItem("userToken");
            navigate("/login");
        } catch (error) {
            if (error.response && error.response.status === 404) {
                alert("Logout endpoint not found, the server was restarted");
            } else {
                alert(`Something went wrong during the logout: \n${handleError(error, navigate)}`);
            }
            localStorage.removeItem("userToken");
            window.location.reload();
        }
    };

    return (
        <BaseContainer className="profilepopup container">
            <div className="profilepopup button-container">
                <Button onClick={() => navigate("/profile")}>Profile</Button>{" "}
                <Button onClick={() => doLogout()} >
                    Logout
                </Button>
            </div>
        </BaseContainer>
    );
};

ProfilePopup.propTypes = {
    onMouseEnter: PropTypes.func.isRequired,
    onMouseLeave: PropTypes.func.isRequired,
};

export default ProfilePopup;
