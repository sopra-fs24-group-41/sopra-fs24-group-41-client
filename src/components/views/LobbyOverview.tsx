import React, { useEffect, useState } from "react";
import { Spinner } from "components/ui/Spinner";
import { Button } from "components/ui/Button";
import { useNavigate } from "react-router-dom";
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
import "styles/views/LobbyOverview.scss";
import { Lobby } from "types";

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
    className="player container"
    onClick={() => onSelect(lobby)}
    style={{
      border: isSelected ? "1px solid blue" : "none",
    }}
  >
    <div className="player username">{lobby.lobbyName}</div>
  </div>
);

LobbyItem.propTypes = {
  lobby: PropTypes.object,
};

const LobbyOverview = () => {
  const [lobbies, setLobbies] = useState<Lobby[]>(null);
  const [selectedLobby, setSelectedLobby] = useState<Lobby | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    //Dummy stand in, should be replaced.

    const fetchLobbies = async () => {
      setTimeout(() => {
        const dummyLobbies: Lobby[] = [
          { lobbyName: "Lobby 1", code: "ABC123" },
          { lobbyName: "Lobby 2", code: "DEF456" },
          { lobbyName: "Lobby 3", code: "GHI789" },
        ];
        setLobbies(dummyLobbies);
      }, 1000); // Simulated delay of 1 second
    };
    fetchLobbies();
  }, []);

  const selectLobby = (lobby:Lobby) => {setSelectedLobby(lobby)}

  let content = <Spinner />;

  if (lobbies) {
    content = (
      <div className="game">
        <ul className="game user-list">
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
        <Button width="100%" onClick={() => logout()} disabled={!selectedLobby}>
          Join Lobby
        </Button>
      </div>
    );
  }

  const logout = () => {
    navigate("/login");
  };

  return (
    <BaseContainer className="game container">
      <h2>Lobby Overview</h2>
      <p className="game paragraph">Select a Lobby to Join</p>
      {content}
    </BaseContainer>
  );
};

export default LobbyOverview;
