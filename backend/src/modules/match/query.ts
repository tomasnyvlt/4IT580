import { seasons } from "@prisma/client";
import { GQLError } from "../../utils/return_statements/errors";

export const matches = async (_: void, __: void, context: Context) => {
  const matches = await context.prisma.match.findMany();
  if (matches.length < 1) {
    throw new GQLError().noMatches();
  }
  return matches.slice(0, 20);
};

export const match = async (
  _: void,
  args: { id_match: number },
  context: Context
) => {
  const match = await context.prisma.match.findFirst({
    where: {
      id_match: args.id_match,
    },
  });
  return match;
};

export const matchesBySeason = async (
  _: void,
  args: { season: seasons },
  context: Context
) => {
  const matchesBySeason = await context.prisma.match.findMany({
    where: {
      season: args.season,
    },
  });
  if (matchesBySeason.length < 1) return new GQLError().noMatches();
  return matchesBySeason.slice(0, 20);
};
