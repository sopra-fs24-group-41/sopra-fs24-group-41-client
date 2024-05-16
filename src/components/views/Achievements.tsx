import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/Button";
import "styles/views/Login.scss";
import "styles/views/Profile.scss";
import BaseContainer from "../ui/BaseContainer"
import { api, handleError } from "../../helpers/api"
import User from "../../models/User";
import PropTypes from "prop-types";
import Achievement from "../../models/Achievement"
import "styles/views/Achievements.scss";
import IMAGES from "../../assets/images/index1.js";

const DummyAchievement = [
    { id: 100, title: "Wow this is the dummy achievement", description: "description", profilePicture: "BlueFrog" }
]

const AchievementItem = ({ achievement }: {achievement: Achievement}) => (
    <div>
        <div className="achievement icon">
            <img src={IMAGES[achievement.profilePicture]} alt="achievement icon" />
        </div>
        <div className="achievement-details">
            <div className="achievement-title">
                {achievement.title}
            </div>
            <div className="achievement-description">
                {achievement.description}
            </div>
        </div>
    </div>
);

AchievementItem.propTypes = {
    achievement: PropTypes.object,
};

const Achievements = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({username: "...", status: "..."});
    const [achievements, setAchievements] = useState(DummyAchievement)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userId = localStorage.getItem("userId");
                let response = await api.get("/users/" + userId);
                const user = new User(response.data);
                setUserData(user);
                console.log(achievements);
                // setAchievements(user.achievements);
            } catch (error) {
                console.log(error)
                handleError(error)
            }
        };
        fetchData();
    }, []);

    const achievementFormat = ( user, achievement ) => {
        if (achievements.indexOf(achievement)) return "achievement unlocked";
        else return "achievement locked";
    }

    return (
        <BaseContainer>
            <div className="achievements container">
                <ul className="achievements list">
                    {achievements.map((achievement: Achievement) => (
                        <li key={achievement.id}
                            className={achievementFormat(userData, achievement)}
                        >
                            <AchievementItem
                                achievement={achievement}
                            />
                        </li>
                    ))}
                </ul>
                <div className="profile button-container">
                    <Button
                        width="100%"
                        onClick={() => navigate("/profile")}
                    >
                        Return to profile
                    </Button>
                </div>
            </div>
        </BaseContainer>
    );
};

export default Achievements;