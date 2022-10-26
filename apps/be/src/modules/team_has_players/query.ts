export const teamsHavePlayers = async (_: void, __: void, context: Context) => {
  const teamsHavePlayers = await context.prisma.team_has_players.findMany();
  return teamsHavePlayers.slice(0, 20);
};

type teamHasPlayersArgs = {
  id_team: number;
};
export const teamHasPlayers = async (
  _: void,
  args: teamHasPlayersArgs,
  context: Context
) => {
  const teamHasPlayers = await context.prisma.team_has_players.findMany({
    where: {
      id_team: args.id_team,
    },
  });
  return teamHasPlayers.slice(0, 20);
};

type playerInTeamsArgs = {
  id_user: number;
};
export const playerInTeams = async (
  _: void,
  args: playerInTeamsArgs,
  context: Context
) => {
  const playerInTeams = await context.prisma.team_has_players.findMany({
    where: {
      id_user: args.id_user,
    },
  });
  return playerInTeams.slice(0, 20);
};
