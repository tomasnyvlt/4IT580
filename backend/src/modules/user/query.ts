export type UserArgs = {
    id_user: number
}
export const user = async(_:void, args:UserArgs, context: Context) => {
    const prisma = context.prisma;
    const result = await prisma.user.findFirst({
        where: {
            id_user: args.id_user
        }
    });
    if(!result) throw Error("User not found");
    return {
        id: result.id_user,
        firstName: result.first_name,
        lastName: result.last_name,
        userName: result.user_name,
        email: result.email,
        timeRegistered: result.time_registered?.toISOString(),
        timeLastLogin: result.time_last_login?.toISOString()
    }
}