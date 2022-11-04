export const events = async (_:void, __:void, context: Context) => {
    const prisma = context.prisma;
    const events = await prisma.event.findMany()
    return events.slice(0, 20)
}

type eventArgs = {
    idEvent: number
}
export const event = async (_:void, args:eventArgs, context: Context) => {
    const prisma = context.prisma;
    const event = await prisma.event.findFirst({
        where: {
            id_event: args.idEvent
        }
    });
    return {
        ...event,
        timeHappened: event?.time_happened
    }
}
