import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "components/ui/Button";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "styles/views/Login.scss";
import "styles/views/Profile.scss";
import BaseContainer from "components/ui/BaseContainer";
import { format } from "date-fns/format";
import ProfileIcon from "components/ui/ProfileIcon";


const Profile = () => {
  const navigate = useNavigate();
  const [birthday, setBirthday] = useState(new Date("2001-04-01")); // Example birthday
  const [isEditingBirthday, setIsEditingBirthday] = useState(false);

  const handleEditBirthday = () => {
    setIsEditingBirthday(true);
  };

  const handleSaveBirthday = () => {
    setIsEditingBirthday(false);
    // Any save logic can be implemented here, like sending data to the server
  };

  const handleCancelEditBirthday = () => {
    setIsEditingBirthday(false);
    // Reset birthday to its previous value if needed
  };

  const tableData = [
    {
      label: "Username:",
      value: "xxGamerxx",
    },
    { label: "Creation Date:", value: "31.03.2024" },
    { label: "Status:", value: "Online" },
    {
      label: "Birth Date:",
      value: format(birthday, "dd-MM-yyyy"),
      button: isEditingBirthday ? (
        <>
          <DatePicker
            selected={birthday}
            onChange={setBirthday}
            dateFormat="dd-MM-yyyy"
          />
          <Button onClick={handleSaveBirthday}>Save</Button>
          <Button onClick={handleCancelEditBirthday}>Cancel</Button>
        </>
      ) : (
        <Button onClick={handleEditBirthday}>Edit</Button>
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
                  <td>{row.button}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="login button-container">
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
