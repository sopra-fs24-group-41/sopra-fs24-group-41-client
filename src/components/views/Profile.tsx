import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "components/ui/Button";
import "styles/views/Login.scss";
import "styles/views/Profile.scss";
import BaseContainer from "components/ui/BaseContainer";
import { format, isValid } from "date-fns";
import ProfileIcon from "components/ui/ProfileIcon";
import { api, handleError } from "helpers/api";
import User from "models/User";

const Profile = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState();
    const [favourite, setFavourite] = useState(null);
    const [profilePicture, setProfilePicture] = useState();
    const [isEditing, setIsEditing] = useState(false);
    const [userData, setUserData] = useState({
        username: "...",
        status: "...",
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userId = localStorage.getItem("userId");
                let response = await api.get("/users/" + userId);
                response.data.creationDate = handleDate(
                    response.data.creationDate
                );
                const userdata = new User(response.data);
                setUserData(userdata);
                setUsername(userdata.username);
                let fav = userdata.favourite === null ? "Zaddy" : userdata.favourite;
                setFavourite(fav);
            } catch (error) {
                alert("Server Connection lost");
                navigate("/lobbyoverview");
            }
        };
        fetchData();
    }, []);

    const updateUserData = async (username, favourite) => {
        const prevUsername = userData.username;
        const prevFavourite =
            userData.favourite === null ? "Zaddy" : userData.favourite;
        const prevProfilePicture = userData.profilePicture;
        try {
            const token = localStorage.getItem("userToken");
            const userId = localStorage.getItem("userId");
            const config = {
                headers: {
                    Authorization: token,
                    "Content-Type": "application/json",
                },
            };

            const response = await api.put(
                "/users/" + userId,
                {
                    username: username,
                    favourite: favourite,
                    profilePicture: profilePicture,
                },
                config
            );

            setFavourite(favourite);
        } catch (error) {
            handleError(error, navigate);
            let error_msg = error.response.data.message;
            alert("Failed to update user data: " + error_msg);
            setUsername(prevUsername);
            setFavourite(prevFavourite);
            setProfilePicture(prevProfilePicture);
        }
    };

    const handleEdit = () => {
        if (isEditing) {
            setUsername(username);
            setFavourite(favourite);
            updateUserData(username, favourite);
        }
        setIsEditing(!isEditing);
    };

    const handleDate = (dateString) => {
        const dateObject = new Date(dateString);

        return format(dateObject, "dd-MM-yyyy");
    };

    const handleSelectImage = (image) => {
        if (profilePicture !== image) {
            setProfilePicture(image);
        }
    };

    const tableData = [
        {
            label: "Username:",
            value: isEditing ? (
                <input
                    className="input-css"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            ) : (
                username
            ),
        },
        { label: "Creation Date:", value: userData.creationDate },
        { label: "Status:", value: userData.status },
        { label: "Wins:", value: userData.wins },
        { label: "Losses:", value: userData.losses },
        {
            label: "Favourite Word:",
            value: isEditing ? (
                <input
                    className="input-css"
                    value={favourite}
                    onChange={(e) => setFavourite(e.target.value)}
                />
            ) : favourite === "" ? (
                "Zaddy"
            ) : (
                favourite
            ),
        },
    ];

    return (
        <BaseContainer>
            <div className="profile container">
                <div className="profile back">
                    <ProfileIcon
                        Current={userData.profilePicture}
                        isEditing={isEditing}
                        SelectedImage={handleSelectImage}
                    />
                    <table className="profile table">
                        <tbody>
                            {tableData.map((row, index) => (
                                <tr key={index}>
                                    <td>{row.label}</td>
                                    <td>{row.value}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="login button-container">
                        <Button width="100%" onClick={handleEdit}>
                            {isEditing ? "Save" : "Edit"}
                        </Button>
                        <Button
                            width="100%"
                            onClick={() => navigate("/lobbyoverview")}
                        >
                            Return to Lobby Overview
                        </Button>
                    </div>
                </div>
            </div>
        </BaseContainer>
    );
};

export default Profile;
