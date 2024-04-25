export type User = {
  username: string;
  profilePicture: string;
  id: number;
  player: Player;
};

export type Lobby = {
  code: number;
  name: string;
  publicAccess: boolean;
  status: string;
  mode: string;
  owner: Player;
  players: Array<Player>;
};

export type Gamemode = {
  gamemodeName: string;
  description: string;
};

export type Player = {
  id: number;
  name: string;
  points: number;
  icon: string;
  token: string;
  wins: string;
  losses: string;
  total_wins: string;
  total_losses: string;
  words_generated: string;
  user: User;
  owned_lobby: Lobby;
  lobby: Lobby;
}


