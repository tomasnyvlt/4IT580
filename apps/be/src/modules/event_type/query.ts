import { PrismaClient } from "@prisma/client"

export const eventTypes = async (_:void, __:void, context: Context) => {
    const prisma = context.prisma;
    const eventTypes = await prisma.event_type.findMany()
    return eventTypes.slice(0, 20)
}