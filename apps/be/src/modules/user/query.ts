type UserArgs = {
    id_user: number
}
export const user = async(_:void, args:UserArgs, context: Context) => {
    const prisma = context.prisma;
    return await prisma.user.findFirst({
        where: {
            id_user: args.id_user
        }
    });
}