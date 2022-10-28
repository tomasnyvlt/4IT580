export const teamsMetaData = async (_: void, __: void, context: Context) => {
  const teamsMetaData = await context.prisma.team_meta_data.findMany();
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
  return teamMetaData.slice(0, 20);
};
