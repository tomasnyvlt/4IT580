import { PrismaClient } from "@prisma/client";


declare global{
    interface Context {
        prisma: PrismaClient,
        auth: AppUser
    }

    interface AppUser {
        readonly getUserID: () => number|null,
        readonly isLoggedIn: () => boolean
    }
}