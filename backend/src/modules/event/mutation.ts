import { GQLSuccess } from "../../utils/return_statements/success";

type eventArgs = {
  time_happened: string | undefined;
  id_match: number;
  id_event_type: number;
  user_id_user: number;
  id_counter_event: number;
};

export const addEvent = async (_: void, args: eventArgs, context: Context) => {
  return await context.prisma.event.create({
    data: args,
  });
};

export const deleteEvent = async (
  _: void,
  args: { id_event: number },
  context: Context
) => {
  const deleteEvent = await context.prisma.event.delete({
    where: {
      id_event: args.id_event,
    },
  });
  return new GQLSuccess().rowDeleted();
};

export const updateEvent = async (
  _: void,
  args: eventArgs & { id_event: number },
  context: Context
) => {
  return await context.prisma.event.update({
    where: {
      id_event: args.id_event,
    },
    data: {
      time_happened: args?.time_happened,
      id_match: args.id_match,
      id_event_type: args.id_event_type,
      user_id_user: args.user_id_user,
      id_counter_event: args.id_counter_event,
    },
  });
};
