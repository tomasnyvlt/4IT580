export const matches = async (_: void, __: void, context: Context) => {
  const matches = await context.prisma.match.findMany();
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
};
