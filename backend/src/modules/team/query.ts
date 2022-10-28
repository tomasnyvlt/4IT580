import { deleteTeamArgs } from './mutation.js';

export const teams = async (_: void, __: void, context: Context) => {
  const teams = await context.prisma.team.findMany();
  return teams.slice(0, 20);
};

type teamArgs = deleteTeamArgs;
export const team = async (_: void, args: teamArgs, context: Context) => {
  return await context.prisma.team.findUnique({
    where: {
      id_team: args.id_team,
    },
  });
};
