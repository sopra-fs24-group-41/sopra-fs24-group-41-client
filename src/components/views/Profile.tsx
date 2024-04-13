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
    const [isEditing, setIsEditing] = useState(false);
    const [userData, setUserData] = useState({username: "...", status: "..."});


    useEffect(() => {
        const fetchData = async () => {
            try {
                const userID = localStorage.getItem("userID");
                const response = await api.get("/users/" + userID);
                const userdata = new User(response.data);
                console.log(userdata);
                setUserData(userdata);
                setUsername(userdata.username);
            } catch (error) {
                alert("Server Connection Lost");
                navigate("/lobbyoverview");
            }
        };
        fetchData();
    }, []);
    

    const handleEdit = () => {
        if (isEditing) {
            setUsername(username);
        }
        setIsEditing(!isEditing);
    };

    const formatDate = (dateString: string) => {
        if (isValid(new Date(dateString))) {
            return format(new Date(dateString), "dd-MM-yyyy");
        } else {
            return "not given";
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
        { label: "Creation Date:", value: "31-03-2024" },
        { label: "Status:", value: userData.status },
        { label: "Wins:", value: userData.wins },
        { label: "Losses:", value: userData.losses },
        { label: "Favourite Word:", value: "Zaddy" },
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
