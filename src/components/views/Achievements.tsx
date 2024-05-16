import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "components/ui/Button";
import "styles/views/Login.scss";
import "styles/views/Profile.scss";
import BaseContainer from "components/ui/BaseContainer";
import { api, handleError } from "helpers/api";
import User from "models/User";
import PropTypes from "prop-types";


const AchievementItem = ({ name, description, status, picture }:
                         {
                             name: string;
                             description: string
                             status: boolean;
                             picture: string;
                         }) => (
    <div
        className="achievement container"
    >
        <div className="achievement name">Achievement Name</div>
        <div className="achievement description">Achievement desc</div>
    </div>
);

AchievementItem.propTypes = {
    achievement: PropTypes.object,
};

const Achievements = () => {
    const navigate = useNavigate();
    const [profilePicture, setProfilePicture] = useState();
    const [userData, setUserData] = useState({
        username: "...",
        status: "...",
    });
    const [achievements, setAchievements] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userId = localStorage.getItem("userId");
                let response = await api.get("/users/" + userId);
                const userdata = new User(response.data);
                setUserData(userdata);
                console.log(userdata);
                setAchievements(userdata.achievements);
            } catch (error) {
                console.log(error)
                handleError(error)
            }
        };
        fetchData();
    }, []);


    return (
        <BaseContainer>
            <div className="achievements container">
                <div className="achievements list">
                    placeholder
                    <div className="profile button-container">
                        <Button
                            width="100%"
                            onClick={() => navigate("/profile")}
                        >
                            Return to profile
                        </Button>
                    </div>
                </div>
            </div>
        </BaseContainer>
    );
};

export default Achievements;
