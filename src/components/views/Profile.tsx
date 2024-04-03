import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "components/ui/Button";
import "styles/views/Login.scss";
import "styles/views/Profile.scss";
import BaseContainer from "components/ui/BaseContainer";
import { format } from "date-fns/format";
import ProfileIcon from "components/ui/ProfileIcon";

const Profile = () => {
  const navigate = useNavigate();
  const [username_, setUsername] = useState("xxGamerxx");
  const [birthday, setBirthday] = useState(new Date("2001-04-01")); 
  const [isEditing, setIsEditing] = useState(false);
  const [editedUsername, setEditedUsername] = useState("xxGamerxx");
  const [editedBirthday, setEditedBirthday] = useState(new Date("2001-04-01"));

  const saveChanges = () => {
    setUsername(editedUsername);
    setBirthday(editedBirthday);
  };

  const handleEdit = () => {
    if (isEditing) {
      saveChanges();
    }
    setIsEditing(!isEditing);
  };

  const tableData = [
    {
      label: "Username:",
      value: isEditing ? (
        <input
          value={editedUsername}
          onChange={(e) => setEditedUsername(e.target.value)}
        />
      ) : (
        username_
      ),
    },
    { label: "Creation Date:", value: "31.03.2024" },
    { label: "Status:", value: "Online" },
    {
      label: "Birth Date:",
      value: isEditing ? (
        <input
          type="date"
          value={editedBirthday}
          onChange={(date) => setEditedBirthday(date.target.value)}
        />
      ) : (
        format(birthday, "dd-MM-yyyy")
      ),
    },
    { label: "Wins:", value: "69" },
    { label: "Losses:", value: "42" },
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
                  <td style={{ paddingRight: "15px", fontWeight: "bold" }}>
                    {row.label}
                  </td>
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
