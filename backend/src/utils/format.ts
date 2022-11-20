import { user } from "@prisma/client";

export const formatPlayers = (players: Array<user>) => {
  return players.map((result) => {
    return {
      id: result.id_user,
      firstName: result.first_name,
      lastName: result.last_name,
      email: result.email,
      timeRegistered: result.time_registered?.toISOString(),
      timeLastLogin: result.time_last_login?.toISOString(),
    };
  });
};

export const formatPlayer = (player: user) => {
  return {
    id: player.id_user,
    firstName: player.first_name,
    lastName: player.last_name,
    userName: player.user_name,
    email: player.email,
    timeRegistered: player.time_registered?.toISOString(),
    timeLastLogin: player.time_last_login?.toISOString(),
  };
};
