import { event } from "@prisma/client";
import {
  formatEvent,
  formatEvents,
  formatPlayer,
  formatPlayers,
} from "../../utils/format";
import { GQLError } from "../../utils/return_statements/errors";

export const matchTeams = async (
  parent: { id_match: number },
  _: void,
  context: Context
) => {
  const matchTeams = await context.prisma.team.findMany({
    where: {
      match_has_team: {
        some: {
          id_match: parent.id_match,
        },
      },
    },
  });
  return matchTeams;
};

export const matchEditors = async (
  parent: { id_match: number },
  _: void,
  context: Context
) => {
  const matchEditors = await context.prisma.match_editor.findMany({
    where: {
      match_id_match: parent.id_match,
    },
  });
  return matchEditors.slice(0, 20);
};

type matchEventsArgs = {
  teamId: number;
};
export const matchEvents = async (
  parent: { id_match: number },
  args: matchEventsArgs,
  context: Context
) => {
  const prisma = context.prisma;
  const match = await prisma.match.findFirst({
    where: {
      id_match: parent.id_match,
    },
    include: {
      event: {
        include: {
          user: {
            include: {
              team_has_players: {
                where: {
                  id_team: args.teamId,
                  AND: {
                    OR: [{ state: "admin" }, { state: "joined" }],
                  },
                },
              },
            },
          },
        },
      },
    },
  });

  if (match == null) throw new GQLError().noMatches();
  // Filter out all the user that aren't in the team specified in query.
  const events = match.event.filter((event) => {
    return event.user.team_has_players.length != 0;
  });
  // Sort events by time
  events.sort((a:event, b:event) => {
    if(a.time_happened == null || b.time_happened == null) throw new Error("No time_happened value.");
    const aDate = new Date();
    const aTimeParts = a.time_happened.split(":");
    aDate.setHours(Number.parseInt(aTimeParts[0]), Number.parseInt(aTimeParts[1]));

    const bDate = new Date();
    const bTimeParts = b.time_happened.split(":");
    bDate.setHours(Number.parseInt(bTimeParts[0]), Number.parseInt(bTimeParts[1]));
    return aDate > bDate ? 1 : -1;
  })
  return formatEvents(events);
};

export const matchPlayers = async (
  parent: { id_match: number },
  _: void,
  context: Context
) => {
  const matchPlayers = await context.prisma.user.findMany({
    where: {
      match_players: {
        some: { id_match: parent.id_match },
      },
    },
    include: {
      match_players: {
        where: { id_match: parent.id_match },
      },
    },
  });

  return matchPlayers.map((player) => {
    const formatted = formatPlayer(player);
    return {
      ...formatted,
      match_game_name: player.match_players[0].match_game_name,
      match_role: new Set(player.match_players.map((row) => row.match_role)),
    };
  });
};
