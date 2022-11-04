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
