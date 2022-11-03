export const events = async (_: void, __: void, context: Context) => {
  const events = await context.prisma.event.findMany();
  return events.slice(0, 20);
};

export const event = async (
  _: void,
  args: { id_event: number },
  context: Context
) => {
  const event = await context.prisma.event.findUnique({
    where: {
      id_event: args.id_event,
    },
  });
  return event
};
