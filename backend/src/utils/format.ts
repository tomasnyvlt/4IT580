import { user } from "@prisma/client";

export const formatPlayers = (players: Array<user>) => {
  return players.map((result) => {
    return formatPlayer(result);
  });
};

export const formatPlayer = (player: user) => {
  return {
    id: player.id_user,
    firstName: player.first_name,
    lastName: player.last_name,
    email: player.email,
    timeRegistered: player.time_registered?.toISOString(),
    timeLastLogin: player.time_last_login?.toISOString(),
  };
};
