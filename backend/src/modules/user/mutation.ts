import { hashPassword } from "../../libs/password.js";
import { createRefreshToken, createToken } from "../../libs/token.js";
import { GQLError } from "../../utils/return_statements/errors.js";

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

    if(!emailPatern.test(args.email)) throw new GQLError().invalidEmail();

    const userEmail = await prisma.user.findFirst({
        where: {
            email: args.email
        }
    });
    if(userEmail) throw new GQLError().emailExists();

    const userUsername = await prisma.user.findFirst({
        where: {
            user_name: args.userName
        }
    }); 
    if(userUsername) throw new GQLError().usernameExists();

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
    const accessToken = createToken(user.id_user)
    const refreshToken = createRefreshToken(user.id_user);
    
    await context.prisma.refresh_token.deleteMany({
        where: {
            user_id_user: user.id_user
        }
    });

    await context.prisma.refresh_token.create({
        data: {
            token: refreshToken,
            time_valid_until: addDays(new Date(), 1),
            user_id_user: user.id_user
        }
    })
    return {
        accessToken,
        refreshToken
    }
}

const addDays = (date: Date, days: number) => {
    return new Date(date.valueOf()+24*60*60*1000*days);
}

const emailPatern = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
