type addEventTypeArgs = {
    key: string,
    name: string
}
export const addEventType = async(_:void, args:addEventTypeArgs, context: Context) => {
    return await context.prisma.event_type.create({ data: args});
}

type deleteEventTypeArgs = {
    id_event_type: number
}
export const deleteEventType = async(_: void, args: deleteEventTypeArgs, context: Context) => {+
    await context.prisma.event_type.delete({
        where: {
            id_event_type: args.id_event_type
        }
    })
    return "success";
}

type updateEventTypeArgs = {
    id_event_type: number,
    name: string|undefined,
    key: string|undefined,
}
export const updateEventType = async(_: void, args: updateEventTypeArgs, context: Context) => {
    return await context.prisma.event_type.update({
        where: {
            id_event_type: args.id_event_type
        },
        data: {
            name: args.name,
            key: args.key
        }
    })
}