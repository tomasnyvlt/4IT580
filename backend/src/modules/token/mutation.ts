import { comparePasswords } from '../../libs/password.js';
import { createToken } from '../../libs/token.js';

type LoginArgs = {
    userName: string,
    password: string
}
export const login = async(_:void, args: LoginArgs, context: Context) => {
    const prisma = context.prisma;
    const user = await prisma.user.findFirst({
        where: {
            user_name: args.userName
        }
    });
    if(!user) throw new Error("NO_USER");

    const login = await prisma.login.findFirst({
        where: {
            id_user: user.id_user
        }
    });
    if(!login) throw new Error("NO_PSW_TO_USER");

    const passwordVerified = await comparePasswords(args.password, login.password);
    if(!passwordVerified) throw new Error("WRG_PSW");

    const token = createToken(user.id_user)
    
    return {
        content: token
    }
}