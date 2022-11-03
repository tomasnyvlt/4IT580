export const Leagues = async (_: void, __: void, context: Context) => {
  const leagues = await context.prisma.league.findMany();
  return leagues.slice(0, 20);
};

export const League = async (
  _: void,
  args: { id_league: number },
  context: Context
) => {
  const league = await context.prisma.league.findUnique({
    where: {
      id_league: args.id_league,
    },
  });
  return league;
};
