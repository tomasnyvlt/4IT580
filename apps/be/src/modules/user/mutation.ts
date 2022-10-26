import { hashPassword } from "../../libs/password.js";
import { createToken } from "../../libs/token.js";

type RegisterLoginArgs = {
    firstName: string,
    lastName: string,
    userName: string,
    email: string,
    password: string
}
export const registerLogin = async(_:void, args: RegisterLoginArgs, context: Context) => {
    const hashedPassword = await hashPassword(args.password)
    const prisma = context.prisma;
    const user = await prisma.user.create({
        data: {
            first_name: args.firstName,
            last_name: args.lastName,
            user_name: args.userName,
            email: args.email
        }
    });
    const login = await prisma.login.create({
        data: {
            id_user: user.id_user,
            password: hashedPassword
        }
    });
    const token = createToken({
        id_user: user.id_user,
        loggedIn: true
    })
    return {
        content: token
    }
}