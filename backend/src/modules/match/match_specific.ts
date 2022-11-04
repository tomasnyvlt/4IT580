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

export const matchEditors = async (
  parent: { id_match: number },
  _: void,
  context: Context
) => {
  const matchEditors = await context.prisma.match_editor.findMany({
    where: {
      match_id_match: parent.id_match,
    },
  });
  return matchEditors.slice(0, 20);
};
