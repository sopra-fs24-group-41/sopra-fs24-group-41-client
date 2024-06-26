import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/Button";
import "styles/views/Login.scss";
import "styles/views/Profile.scss";
import BaseContainer from "../ui/BaseContainer";
import { api, useError } from "../../helpers/api";
import User from "../../models/User";
import PropTypes from "prop-types";
import Achievement from "../../models/Achievement";
import "styles/views/Achievements.scss";
import IMAGES from "../../assets/images/index1.js";
import ICONS from "../../assets/icons/index.js";

const AchievementItem = ({ achievement }) => (
    <div className="achievement">
        <div className="achievement icon">
            <img
                src={
                    IMAGES[achievement.profilePicture] ||
                    ICONS[achievement.profilePicture]
                }
                alt="achievement icon"
            />
        </div>
        <div className="achievement details">
            <div className="achievement title">{achievement.title}</div>
            <div className="achievement description">
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
    const [achievements, setAchievements] = useState([]);
    const [userAchievements, setUserAchievements] = useState([]);
    const { handleError } = useError();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userId = localStorage.getItem("userId");
                let response = await api.get("/users/" + userId);
                const user = new User(response.data);
                let responseAchievement = await api.get("users/achievements");
                setAchievements(responseAchievement.data);
                setUserAchievements(user.achievements);
            } catch (error) {
                handleError(error, navigate);
            }
        };
        fetchData();
    }, []);

    const achievementFormat = (achievementX) => {
        if (
            userAchievements.some(
                (achievement) => achievement.name === achievementX.name
            )
        ) {
            return "achievement unlocked";
        } else {
            return (achievementX.hidden ? "achievement locked hidden" : "achievement locked");
        }
    };

    return (
        <BaseContainer>
            <div className="achievements container">
                <h2>Achievements</h2>
                <ul className="achievements list">
                    {achievements.map((achievement: Achievement) => (
                        <li
                            key={achievement.id}
                            className={achievementFormat(achievement)}
                        >
                            <AchievementItem achievement={achievement} />
                        </li>
                    ))}
                </ul>
                <div className="achievement-button-container">
                    <Button
                        width="100%"
                        onClick={() => navigate("/lobbyoverview")}
                    >
                        Return to Overview
                    </Button>
                </div>
            </div>
        </BaseContainer>
    );
};

export default Achievements;
