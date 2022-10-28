import { GQLSuccess } from '../../utils/return_statements/success';

type addTeamArgs = {
  name: string;
  image_url: string;
};
export const addTeam = async (_: void, args: addTeamArgs, context: Context) => {
  return await context.prisma.team.create({ data: args });
};

export type deleteTeamArgs = {
  id_team: number;
};
export const deleteTeam = async (
  _: void,
  args: deleteTeamArgs,
  context: Context
) => {
  await context.prisma.team.delete({
    where: {
      id_team: args.id_team,
    },
  });
  return new GQLSuccess().rowDeleted();
};

type updateTeamArgs = deleteTeamArgs & addTeamArgs;
export const updateTeam = async (
  _: void,
  args: updateTeamArgs,
  context: Context
) => {
  const updateTeam = await context.prisma.team.update({
    where: {
      id_team: args.id_team,
    },
    data: {
      name: args.name,
      image_url: args.image_url,
    },
  });
  return updateTeam;
};
