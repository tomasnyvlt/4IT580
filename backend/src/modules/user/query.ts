import { GQLError } from "../../utils/return_statements/errors";

export type UserArgs = {
    id_user: number
}
export const user = async(_:void, args:UserArgs, context: Context) => {
    if(context.auth.getUserID() !== args.id_user) throw new GQLError().notAuthenticated();
    const prisma = context.prisma;
    const result = await prisma.user.findFirst({
        where: {
            id_user: args.id_user
        }
    });
    if(!result) throw new GQLError().noMatches();
    return {
        id: result.id_user,
        firstName: result.first_name,
        lastName: result.last_name,
        email: result.email,
        timeRegistered: result.time_registered?.toISOString(),
        timeLastLogin: result.time_last_login?.toISOString()
    }
}