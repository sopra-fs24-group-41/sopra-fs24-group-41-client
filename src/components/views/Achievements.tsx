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
    { id: 100, title: "But it was not an accident!", description: "Zaddy, don't hurt me!", profilePicture: "BlueFrog" },
    { id: 120, title: "You Created A Cutie!", description: "Munya Munya...!", profilePicture: "PinkBunny" },
    { id: 150, title: "Ooga Booga!", description: "They shot me, never forget that.", profilePicture: "SunglassesGorilla" },
    { id: 170, title: "I'm Coming For You, Human!", description: "Rust won't replace C, C is okay, Zig is meh.", profilePicture: "SpaceDude" },
    { id: 200, title: "Club Penguin!", description: "Did you know the dark stories begind Club Penguin?", profilePicture: "AnonPenguin" },
    { id: 200, title: "Club Penguin!!", description: "Did you know the dark stories begind Club Penguin?", profilePicture: "AnonPenguin" },
]

const AchievementItem = ({ achievement }: {achievement: Achievement}) => (
    <div>
        <div className="achievement icon">
            <img src={IMAGES[achievement.profilePicture]} alt="achievement icon" />
        </div>
        <div>
            <div className="achievement title">
                {achievement.title}
            </div>
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

    //Temporary, so Achievements render whenever mock changes.
    useEffect(() => {
        setAchievements(DummyAchievement);
    }
    , [DummyAchievement]);

    const achievementFormat = ( user, achievement ) => {
        if (achievements.indexOf(achievement)) return "achievement unlocked";
        else return "achievement locked";
    }


    return (
        <BaseContainer>
            <div className="achievements container">
                <h2>Achievements</h2>
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