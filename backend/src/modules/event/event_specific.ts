import { event } from "@prisma/client"
import { formatPlayer } from "../../utils/format";

export const match = async (parent: event,_: void,context: Context) => {
    return await context.prisma.match.findFirstOrThrow({
        where: {
            id_match: parent.id_match
        }
    })

}
export const user = async (parent: event,_: void,context: Context) => {
    const user = await context.prisma.user.findFirstOrThrow({
        where: {
            id_user: parent.user_id_user
        }
    });
    return formatPlayer(user);

}
export const eventType = async (parent: event,_: void,context: Context) => {
    return await context.prisma.event_type.findFirstOrThrow({
        where: {
            id_event_type: parent.id_event_type
        }
    });
}
export const counterEvent = async (parent: event,_: void,context: Context) => {
    if(!parent.id_counter_event) return null;
    return await context.prisma.event.findFirst({
        where: {
            id_event: parent.id_counter_event
        }
    });
}