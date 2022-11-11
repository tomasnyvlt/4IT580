import { formatEvent } from "../../utils/format";
import { getCounterEvent } from "./counter_event_relations";

export type AddEventArgs = {
    eventTypeKey: string,
    matchId: number,
    userId: number,
    time: string,
    recieverUserId: number
}
export const addEvent = async (_:void, args: AddEventArgs, context: Context) => {
    // Find event type
    const eventType = await context.prisma.event_type.findFirstOrThrow({
        where: {
            key: args.eventTypeKey
        }
    });
    // Create event
    const event = await context.prisma.event.create({
        data: {
            time_happened: args.time,
            id_match: args.matchId,
            id_event_type: eventType.id_event_type,
            user_id_user: args.userId,
            id_counter_event: undefined
        }
    });
    // Find counter event, create it and get its ID.
    const counterEventId = await getCounterEvent(context.prisma, args, event.id_event);
    // Update counter event value.
    await context.prisma.event.update({
        where: {
            id_event: event.id_event
        },
        data: {
            id_counter_event: counterEventId
        }
    });
    return formatEvent(event);
}