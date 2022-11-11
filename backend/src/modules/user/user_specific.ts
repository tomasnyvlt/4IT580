import { event, Prisma, PrismaClient } from "@prisma/client";
import { Console } from "console";
import { formatEvents } from "../../utils/format";

export type parentUser = {
  id: number;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  timeRegistered: string;
  timeLastLogin: string;
};
export const userTeams = async (
  parent: parentUser,
  _: void,
  context: Context
) => {
  console.log(parent);
  const teams = await context.prisma.team.findMany({
    where: {
      team_has_players: {
        some: {
          id_user: parent.id,
        },
      },
    },
  });
  return teams.slice(0, 20);
};

type userEventsArgs = {
  teamId: number,
  matchId?: number,
  eventKey?: string
}
export const userEvents = async (parent: parentUser, args: userEventsArgs,context: Context) => {
  const prisma = context.prisma;

  const eventTypeId = args.eventKey 
    ? (await prisma.event_type.findFirstOrThrow({
      where: {
        key: args.eventKey
      }
    })).id_event_type
    : undefined;

  if(args.matchId){
    return await getEventsForUserInMatch(prisma, parent.id, args.matchId, eventTypeId);
  } else {
    return await getEventsForUserInTeam(prisma, parent.id, args.teamId, eventTypeId);
  }
}

const getEventsForUserInMatch = async (prisma:PrismaClient, userId: number, matchId: number, eventId: number|undefined) => {
  const match = await prisma.match.findFirstOrThrow({
    where: {
      id_match: matchId,
    },
    include: {
      event: {
        where: {
          user_id_user: userId,
          id_event_type: eventId
        }
      }
    }
  });
  return formatEvents(match.event);
}

const getEventsForUserInTeam = async (prisma:PrismaClient, userId:number, teamId: number, eventId: number|undefined) =>{
  const events:event[] = [];
  const matchRows = await prisma.match_has_team.findMany({
    where: {
      id_team: teamId,
      state: "accepted"
    },
    include: {
      match: {
        include: {
          event: {
            where: {
              user_id_user: userId,
              id_event_type: eventId
            }
          }
        }
      }
    }
  });
  matchRows.forEach((match) => {
    match.match.event.forEach((event) => {
      events.push(event);
    })
  })
  
  return formatEvents(events);
}