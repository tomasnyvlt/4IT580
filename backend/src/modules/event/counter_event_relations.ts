import { PrismaClient } from "@prisma/client";
import { GQLError } from "../../utils/return_statements/errors";
import { AddEventArgs } from "./mutation";

/**
 * 
 * @param prisma Instance of Prisma Client.
 * @param eventArgs Arguments containing information from frontend.
 * @param eventId ID of the initial event.
 * @returns ID of the created counter event | null if no counter event is defined.
 */
export const getCounterEvent = ( prisma:PrismaClient, eventArgs:AddEventArgs, eventId: number) => {
    return Object.keys(relations).includes(eventArgs.eventTypeKey) ? relations[eventArgs.eventTypeKey](prisma, eventArgs, eventId) : null;
}

/**
 * If fault happens there has to be created event 'was faulted'
 * @returns ID of event that someone was faulted
 */
const didFaultCounterAction = async (prisma:PrismaClient, eventArgs: AddEventArgs, eventId:number) => {
    if(!eventArgs.recieverUserId) new GQLError().noEventRecieverSet();
    const counterEventType = await prisma.event_type.findFirstOrThrow({
        where: {
            key: counterEvents["didFaul"]
        }
    });
    const counterEvent = await prisma.event.create({
        data: {
            time_happened: eventArgs.time,
            id_match: eventArgs.matchId,
            id_event_type: counterEventType.id_event_type,
            user_id_user: eventArgs.recieverUserId,
            id_counter_event: eventId
        }
    })
    return counterEvent.id_event;
}

const relations:{[eventKey: string]: (prisma:PrismaClient, eventArgs: AddEventArgs, eventId:number) => Promise<number> } = {
    "didFaul": didFaultCounterAction
}

const counterEvents = {
    "didFaul": "wasFaulted",
    "wasFaulted": "didFaul"
}
