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
    const user = localStorage.getItem("currentUser");
    localStorage.setItem("test", user);
    const [username, setUsername] = useState();
    const [favourite, setFavourite] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [userData, setUserData] = useState({username: "...", status: "..."});


    useEffect(() => {
        const fetchData = async () => {
            try {
                const userID = localStorage.getItem("userID");
                let response = await api.get("/users/" + userID);
                response.data.creationDate = handleDate(response.data.creationDate);
                const userdata = new User(response.data);
                console.log(userdata);
                setUserData(userdata);
                setUsername(userdata.username);
                !userData.favourite ? setFavourite("Zaddy") : setFavourite(userData.favourite)
  
            } catch (error) {
                alert("Server Connection Lost");
                navigate("/lobbyoverview");
            }
        };
        fetchData();
    }, []);

    const updateUserData = async (username, favourite) => {
        const prevUsername = userData.username;
        const prevFavourite = userData.favourite;
        try {
            const token = localStorage.getItem("token"); 
            const userID = localStorage.getItem("userID");
            const config = {
                headers: {
                    "Authorization": token,
                    "Content-Type": "application/json"
                }
            };
    
            const response = await api.put("/users/" + userID, {
                username: username,
                favourite: favourite, 
            }, config);
            
            console.log("User data updated successfully:", response.data);
        } catch (error) {
            alert("Failed to update user data:\n" + error.response.data.message);
            setUsername(prevUsername);
            setFavourite("Zaddy");
        }
    };
    

    const handleEdit = () => {
        if (isEditing) {
            setUsername(username);
            setFavourite(favourite);
        }
        setIsEditing(!isEditing);
        updateUserData(username, favourite);
    };

    const handleDate = (dateString) =>{
        const dateObject = new Date(dateString);

        return format(dateObject, "dd-MM-yyyy");
    }

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
        { label: "Creation Date:", value: userData.creationDate},
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
            ) : (
                favourite === "" ? "Zaddy" : favourite
            ),
        },
    ];

    return (
        <BaseContainer>
            <div className="profile container">
                <div className="profile back">
                    <ProfileIcon />
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
                        <Button width="100%" onClick={() => navigate("/lobbyoverview")}>
                            Return to Lobby Overview
                        </Button>
                    </div>
                </div>
            </div>
        </BaseContainer>
    );
};

export default Profile;
