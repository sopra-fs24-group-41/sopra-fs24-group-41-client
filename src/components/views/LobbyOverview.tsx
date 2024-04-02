import React, { useEffect, useState } from "react";
import { Spinner } from "components/ui/Spinner";
import { Button } from "components/ui/Button";
import { useNavigate } from "react-router-dom";
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
import "styles/views/LobbyOverview.scss";
import { Lobby } from "types";
import Icon from "../ui/Icon";
import LoginRegister from "components/popup-ui/LoginRegister";
import ProfileIcon from "../ui/ProfileIcon";
import ProfilePopup from "components/popup-ui/ProfilePopup";

//Adds CSS + onSelect functionality to each Lobby displayed in the list
//(Selection functionality)
const LobbyItem = ({
  lobby,
  onSelect,
  isSelected,
}: {
  lobby: Lobby;
  onSelect: (lobby: Lobby) => void;
  isSelected: boolean;
}) => (
  <div
    className="lobby container"
    onClick={() => onSelect(lobby)}
    style={{
      border: isSelected ? "1px solid #1E90FF" : "none",
    }}
  >
    <div className="lobby lobby-name">{lobby.lobbyName}</div>
  </div>
);

LobbyItem.propTypes = {
  lobby: PropTypes.object,
};

const LobbyOverview = () => {
  const [lobbies, setLobbies] = useState<Lobby[]>(null);
  const [selectedLobby, setSelectedLobby] = useState<Lobby | null>(null);
  const [LoginRegisterPopup, setLoginRegisterPopup] = useState(false);

  useEffect(() => {
    //Dummy stand in, should be replaced.
    const fetchLobbies = async () => {
      setTimeout(() => {
        const dummyLobbies: Lobby[] = [
          { lobbyName: "Lobby 1", code: "ABC123" },
          { lobbyName: "Lobby 2", code: "DEF456" },
          { lobbyName: "Lobby 3", code: "GHI789" },
          { lobbyName: "Lobby 4", code: "GHI789" },
        ];
        setLobbies(dummyLobbies);
      }, 1000); // Simulated delay of 1 second
    };
    fetchLobbies();
  }, []);

  //Allows selection / deselection
  const selectLobby = (lobby: Lobby) => {
    setSelectedLobby((prevSelectedLobby) =>
      prevSelectedLobby === lobby ? null : lobby
    );
  };
  /*
  1. Take previous input
  2. Verify if previous input === current input: If yes, set lobby to null
  3. Else, set lobby to the current lobby*/

  //Allows toggling, true/false
  const iconClick = () => {
    setLoginRegisterPopup((prevState) => !prevState);
  };
  /*
  1. Take previous state
  2. Return the negation of it. (Allows toggling of LoginRegisterPopup variable)*/

  let content = <Spinner />;

  if (lobbies) {
    content = (
      <div className="lobbyoverview">
        <ul className="lobbyoverview lobby-list">
          {lobbies.map((lobby: Lobby) => (
            <li key={lobby.lobbyName}>
              <LobbyItem
                lobby={lobby}
                onSelect={selectLobby}
                isSelected={lobby === selectedLobby}
              />
            </li>
          ))}
        </ul>
        <div className="login button-container">
          <Button
            width="100%"
            onClick={() => joinLobby()}
            disabled={!selectedLobby}
          >
            Join Lobby
          </Button>

          <Button
            width="100%"
            onClick={() => joinLobby()}
            disabled={selectedLobby}
          >
            Create Lobby
          </Button>
        </div>
      </div>
    );
  }

  const joinLobby = () => {
    alert("To be implemented!");
  };

  return (
    <div className="container-wrapper">
      <BaseContainer className="lobbyoverview container">
        <h2>Lobby Overview</h2>
        <p>Select a Lobby to Join</p>
        {content}
      </BaseContainer>
      <Icon onClick={() => iconClick()} />
      {LoginRegisterPopup && localStorage.getItem("token") === null && (
        <LoginRegister />
      )}
      {LoginRegisterPopup && localStorage.getItem("token") !== null && (
        <ProfilePopup />
      )}
    </div>
  );
};
/*{LoginRegisterPopup && <LoginRegister />}: 
Conditional rendering, based on Truth value of LoginRegisterPopup*/

export default LobbyOverview;
