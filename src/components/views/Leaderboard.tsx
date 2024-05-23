import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/Button";
import "styles/views/Login.scss";
import "styles/views/Profile.scss";
import BaseContainer from "../ui/BaseContainer";
import DailyChallenge from "../../models/DailyChallenge";
import PropTypes from "prop-types";
import "styles/views/Leaderboard.scss";
import IMAGES from "../../assets/images/index1.js";
import ICONS from "../../assets/icons/index.js";
import { api, useError } from "../../helpers/api";

const UserItem = ({ user, curr }) => (
    <div
        className={
            user.username === curr
                ? "leaderboard-entry highlighted"
                : "leaderboard-entry"
        }
    >
        <div className="leaderboard-entry icon">
            <img
                src={IMAGES[user.profilePicture] || ICONS[user.profilePicture]}
                alt="icon"
            />
        </div>
        <div className="leaderboard-entry details">
            <div className="leaderboard-entry username">{user.username}</div>
            <div className="leaderboard-entry numberOfCombinations">
                {"Reached target word with " +
                    user.numberOfCombinations +
                    (user.numberOfCombinations === 1
                        ? " combination"
                        : " combinations")}
            </div>
        </div>
    </div>
);

UserItem.propTypes = {
    user: PropTypes.shape({
        username: PropTypes.string.isRequired,
        numberOfCombinations: PropTypes.number.isRequired,
        profilePicture: PropTypes.string.isRequired,
    }).isRequired,
    curr: PropTypes.string.isRequired,
};

const Leaderboard = () => {
    const navigate = useNavigate();
    const [curr, setCurr] = useState("Primagen");
    const [searchTerm, setSearchTerm] = useState("");
    const [fetchedRecords, setFetchedRecords] = useState([]);
    const { handleError } = useError();
    const targetWord = "Zaddy";

    useEffect(() => {
        const fetchChallengeData = async () => {
            try {
                let response = await api.get("/users/challenges");
                const challenges = response.data.map(
                    (data) => new DailyChallenge(data)
                );
                setFetchedRecords(challenges);
            } catch (error) {
                handleError(error, navigate);

            }
        };
        fetchChallengeData();
    }, []);

    useEffect(() => {
        // Find the username associated with the userID
        const userID = localStorage.getItem("userId");
        const currChallenger = fetchedRecords.find(
            (challenge) => challenge.id.toString() === userID
        );
        if (currChallenger && currChallenger.username) {
            setCurr(currChallenger.username);
        }
    });

    const userRefs = useRef({});

    useEffect(() => {
        userRefs.current = fetchedRecords.reduce((acc, user) => {
            acc[user.username] = React.createRef();

            return acc;
        }, {});
    }, [fetchedRecords]);

    const handleSearch = (e) => {
        const term = e.target.value;
        setSearchTerm(term);

        const user = fetchedRecords.find((user) =>
            user.username.toLowerCase().includes(term.toLowerCase())
        );

        if (user && userRefs.current[user.username]) {
            userRefs.current[user.username].scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    };

    return (
        <BaseContainer>
            <div className="leaderboard container">
                <h2>Daily Challenge Leaderboard</h2>
                <p>
                    {"Today's target word was: "}
                    <span className="target-word">{targetWord}</span>
                </p>
                <input
                    className="search-input-css-leaderboard"
                    type="text"
                    placeholder="Search users"
                    value={searchTerm}
                    onChange={handleSearch}
                />
                <ul className="leaderboard list">
                    {fetchedRecords.length > 0 ? (
                        fetchedRecords.map((item) => (
                            <li
                                key={`${item.numberOfCombinations}-${item.username}`}
                                ref={(selectedItem) =>
                                    (userRefs.current[item.username] =
                                        selectedItem)
                                }
                            >
                                <UserItem user={item} curr={curr} />
                            </li>
                        ))
                    ) : (
                        <h3>
                            No one has completed their daily challenge yet, be
                            the first to do so!
                        </h3>
                    )}
                </ul>
                <div className="leaderboard-button-container">
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