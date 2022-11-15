import { event } from "@prisma/client";
import { formatEvent, formatEvents } from "../../utils/format";
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
  teamId: number
};
export const matchEvents = async(parent: { id_match: number}, args:matchEventsArgs, context: Context) => {
  const prisma = context.prisma;
  console.log("args.teamId", args.teamId)
  const match = await prisma.match.findFirst({
    where: {
      id_match: parent.id_match
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
                    OR: [
                      { state: "admin" },
                      { state: "joined" }
                    ]
                  }
                }
              }
            }
          }
        },
        orderBy: {
          time_happened: 'asc'
        }
      }
    },
  });



  if(match == null) throw new GQLError().noMatches();
  // Filter out all the user that aren't in the team specified in query.
  const events = match.event.filter((event) => {
    return event.user.team_has_players.length != 0;
  });
  return formatEvents(events);
}
