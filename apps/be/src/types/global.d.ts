import { PrismaClient } from "@prisma/client";


declare global{
    interface Context {
        prisma: PrismaClient,
        auth: any
    }
}