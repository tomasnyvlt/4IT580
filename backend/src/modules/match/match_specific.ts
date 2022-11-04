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
