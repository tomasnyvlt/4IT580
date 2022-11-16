import { event, user } from "@prisma/client";

export const formatPlayers = (players: Array<user>) => {
  return players.map((result) => formatPlayer(result));
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

export const formatEvent = (event: event) => {
  return {
    ...event,
    timeHappened: event.time_happened,
  };
};

export const formatEvents = (events: event[]) => {
  return events.map((event) => formatEvent(event));
};
