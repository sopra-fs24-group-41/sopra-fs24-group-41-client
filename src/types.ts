export type User = {
  username: string;
  profilePicture: string;
  id: number;
};

export type Lobby = {
  lobbyName: string;
  code: string;
};

export type Gamemode = {
  gamemodeName: string;
  description: string;
};

export type Player = {
  name: string;
  icon: string;
  token: string;
  wins: string;
  losses: string;
  total_wins: string;
  total_losses: string;
  words_generated: string;
}


