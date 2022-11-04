import { GQLError } from "../../utils/return_statements/errors";

export const leagues = async (_: void, __: void, context: Context) => {
  const leagues = await context.prisma.league.findMany();
  if (leagues.length < 1) {
    throw new GQLError().noMatches();
  }
  return leagues.slice(0, 20);
};

export const league = async (
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
