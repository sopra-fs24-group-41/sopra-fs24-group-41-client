import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "components/ui/Button";
import "styles/views/Login.scss";
import "styles/views/Profile.scss";
import BaseContainer from "components/ui/BaseContainer";
import { format } from "date-fns";
import ProfileIcon from "components/ui/ProfileIcon";
import { api } from "helpers/api";
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
    const [editError, setEditError] = useState(false);
    const [editErrorMsg, setEditErrorMsg] = useState(" ");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userId = localStorage.getItem("userId");
                let response = await api.get("/users/" + userId);
                response.data.creationDate = handleDate(
                    response.data.creationDate
                );
                const userdata = new User(response.data);
                console.log(userdata);
                setUserData(userdata);
                setUsername(userdata.username);
                let fav =
                    userdata.favourite === null ? "Zaddy" : userdata.favourite;
                setFavourite(fav);
            } catch (error) {
                alert("Server Connection lost");
                navigate("/lobbyoverview");
            }
        };
        fetchData();
    }, []);

    const updateUserData = async (username, favourite) => {
        userData.favourite === null ? "Zaddy" : userData.favourite;
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
            console.log(userData);

            return true;
        } catch (error) {
            setEditError(true);
            setEditErrorMsg(error.response.data.message);

            return false;
        }
    };

    const handleEdit = async () => {
        if (isEditing) {
            const updateSuccessful = await updateUserData(username, favourite);

            if (updateSuccessful) {
                setUsername(username);
                setFavourite(favourite);
                setIsEditing(false);
            }
        } else {
            setIsEditing(true);
        }
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

    const formatWord = (word) => {
        if (word) {

            return word.name[0].toUpperCase() + word.name.slice(1);
        }

        return null;
    };

    useEffect(() => {
        if(userData){
        } }, [userData]);

    const tableData = [
        {
            label: "Username:",
            value: isEditing ? (
                <input
                    className={`input-css ${editError ? "error" : ""}`}
                    value={username}
                    onChange={(e) => {
                        setUsername(e.target.value);
                        setEditError(false);
                        setEditErrorMsg(" ");
                    }}
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
                    className={`input-css ${editError ? "error" : ""}`}
                    value={favourite}
                    onChange={(e) => {
                        setFavourite(e.target.value);
                        setEditError(false);
                        setEditErrorMsg(" ");
                    }}
                />
            ) : favourite === "" ? (
                "Zaddy"
            ) : (
                favourite
            ),
        },
        { label: "Combinations Made:", value: userData.combinationsMade },
        { label: "Discovered Words:", value: userData.discoveredWords },
        {
            label: "Rarest Word Found:",
            value: formatWord(userData.rarestWordFound),
        },
        { label: "Fastest Win:", value: userData.fastestWin },
    ];

    return (
        <BaseContainer className="fixup">
            <div className="profile container">
                <ProfileIcon
                    Current={userData.profilePicture}
                    isEditing={isEditing}
                    SelectedImage={handleSelectImage}
                />
                {<p className="error-message">{editErrorMsg}</p>}

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
                        Return to Overview
                    </Button>
                </div>
            </div>
        </BaseContainer>
    );
};

export default Profile;