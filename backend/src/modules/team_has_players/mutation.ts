import { GQLSuccess } from '../../utils/return_statements/success.js';

type addPlayersToTeamsArgs = {
  players: Array<{
    id_user: number;
    id_team: number;
    state: 'invited' | 'joined' | 'admin';
  }>;
};
export const addPlayersToTeams = async (
  _: void,
  args: addPlayersToTeamsArgs,
  context: Context
) => {
  const addPlayersToTeams = await context.prisma.team_has_players.createMany({
    data: args.players.map((player) => {
      return {
        id_user: player.id_user,
        id_team: player.id_team,
        state: player.state,
      };
    }),
  });
  return new GQLSuccess().rowsCreated(addPlayersToTeams.count);
};

type deletePlayerFromTeamArgs = {
  id_user: number;
  id_team: number;
};
export const deletePlayerFromTeam = async (
  _: void,
  args: deletePlayerFromTeamArgs,
  context: Context
) => {
  await context.prisma.team_has_players.delete({
    where: {
      id_user_id_team: {
        id_user: args.id_user,
        id_team: args.id_team,
      },
    },
  });
  return new GQLSuccess().rowDeleted();
};

type updatePlayerInTeamStateArgs = deletePlayerFromTeamArgs & {
  new_state: 'invited' | 'joined' | 'admin';
};
export const updatePlayerInTeamState = async (
  _: void,
  args: updatePlayerInTeamStateArgs,
  context: Context
) => {
  const updatePlayerInTeamState = await context.prisma.team_has_players.update({
    where: {
      id_user_id_team: {
        id_user: args.id_user,
        id_team: args.id_team,
      },
    },
    data: {
      state: args.new_state,
    },
  });
  return updatePlayerInTeamState;
};
