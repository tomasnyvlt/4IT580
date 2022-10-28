import { PrismaClient } from "@prisma/client";


declare global{
    interface Context {
        prisma: PrismaClient,
        auth: TokenContent
    }

    interface TokenContent {
        id_user: number|null,
        loggedIn: boolean
    }
}