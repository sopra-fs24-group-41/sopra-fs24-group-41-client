import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/Button";
import "styles/views/Login.scss";
import "styles/views/Profile.scss";
import BaseContainer from "../ui/BaseContainer";
import User from "../../models/User";
import PropTypes from "prop-types";
import "styles/views/Leaderboard.scss";
import IMAGES from "../../assets/images/index1.js";
import ICONS from "../../assets/icons/index.js";

const DummyUsers = [
    { id: 1, username: "b001", numberOfCombinations: 20, profilePicture: "b001" },
    { id: 2, username: "Primagen", numberOfCombinations: 60, profilePicture: "primeagen" },
    { id: 3, username: "NeetCode", numberOfCombinations: 80, profilePicture: "neetcode" },
    { id: 4, username: "CodeAestetic", numberOfCombinations: 69, profilePicture: "codeaesthetic" },
    { id: 5, username: "Hyperplexed", numberOfCombinations: 42, profilePicture: "hyperplexed" },
];

const UserItem = ({ user, curr }) => (
    <div className={user.username === curr ? "leaderboard-entry highlighted" : "leaderboard-entry"}>
        <div className="leaderboard-entry icon">
            <img
                src={
                    IMAGES[user.profilePicture] ||
                    ICONS[user.profilePicture]
                }
                alt="icon"
            />
        </div>
        <div className="leaderboard-entry details">
            <div className="leaderboard-entry username">{user.username}</div>
            <div className="leaderboard-entry numberOfCombinations">
                {"Number of Combinations: " + user.numberOfCombinations}
            </div>
        </div>
    </div>
);

UserItem.propTypes = {
    user: PropTypes.shape({
        id: PropTypes.number.isRequired,
        username: PropTypes.string.isRequired,
        numberOfCombinations: PropTypes.number.isRequired,
        profilePicture: PropTypes.string.isRequired,
    }).isRequired,
    curr: PropTypes.string.isRequired,
};

const Leaderboard = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState(DummyUsers);
    const [curr, setCurr] = useState("Primagen");

    return (
        <BaseContainer>
            <div className="leaderboard container">
                <h2>Leaderboard</h2>
                <ul className="leaderboard list">
                    {users.map((user) => (
                        <li key={user.id}>
                            <UserItem user={user} curr={curr} />
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

export default Leaderboard;
