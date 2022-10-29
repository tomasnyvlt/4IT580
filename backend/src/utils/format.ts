import { user } from '@prisma/client';

export const formatPlayers = (players: Array<user>) => {
  return players.map((result) => {
    return {
      id: result.id_user,
      firstName: result.first_name,
      lastName: result.last_name,
      userName: result.user_name,
      email: result.email,
      timeRegistered: result.time_registered?.toISOString(),
      timeLastLogin: result.time_last_login?.toISOString(),
    };
  });
};
