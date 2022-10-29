import { formatPlayers } from '../../utils/format.js';
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
  return formatPlayers(invitedPlayers).slice(0, 20);
};

export const teamMetaData = async (
  parent: teamArgs,
  _: void,
  context: Context
) => {
  const teamMetaData = await context.prisma.team_meta_data.findMany({
    where: {
      id_team: parent.id_team,
    },
  });
  return teamMetaData.slice(0, 20);
};
