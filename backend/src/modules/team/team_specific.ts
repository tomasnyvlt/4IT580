import { formatPlayers } from '../../utils/format.js';
import { GQLError } from '../../utils/return_statements/errors.js';
import { teamArgs } from './query.js';

export const teamPlayers = async (
  parent: teamArgs,
  _: void,
  context: Context
) => {
  const players = await context.prisma.user.findMany({
    where: {
      team_has_players: {
        some: {
          id_team: parent.id_team,
        },
      },
    },
  });
  if (!players) return new GQLError().noMatches();
  return formatPlayers(players).slice(0, 20);
};

export const teamInvitedPlayers = async (
  parent: teamArgs,
  _: void,
  context: Context
) => {
  const invitedPlayers = await context.prisma.user.findMany({
    where: {
      team_has_players: {
        some: {
          id_team: parent.id_team,
          state: 'invited',
        },
      },
    },
  });
  if (!invitedPlayers) return new GQLError().noMatches();
  return formatPlayers(invitedPlayers).slice(0, 20);
};

export const teamAdmins = async (
  parent: teamArgs,
  _: void,
  context: Context
) => {
  const invitedPlayers = await context.prisma.user.findMany({
    where: {
      team_has_players: {
        some: {
          id_team: parent.id_team,
          state: 'admin',
        },
      },
    },
  });
  if (!invitedPlayers) return new GQLError().noMatches();
  return formatPlayers(invitedPlayers).slice(0, 20);
};
