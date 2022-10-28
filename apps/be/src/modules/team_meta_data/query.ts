import { GQLError } from '../../utils/return_statements/errors';

export const teamsMetaData = async (_: void, __: void, context: Context) => {
  const teamsMetaData = await context.prisma.team_meta_data.findMany();
  if (teamsMetaData.length < 1) {
    throw new GQLError().noMatches();
  }
  return teamsMetaData.slice(0, 20);
};

export const teamMetaData = async (
  _: void,
  args: { id_team: number },
  context: Context
) => {
  const teamMetaData = await context.prisma.team_meta_data.findMany({
    where: {
      id_team: args.id_team,
    },
  });
  if (teamMetaData.length < 1) {
    throw new GQLError().noMatches();
  }
  return teamMetaData.slice(0, 20);
};
