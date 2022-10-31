import { prisma } from '@prisma/client';
import { comparePasswords } from '../../libs/password.js';
import { createRefreshToken, createToken, verifyRefreshToken } from '../../libs/token.js';
import { GQLError } from '../../utils/return_statements/errors.js';
import { GQLSuccess } from '../../utils/return_statements/success.js';

type LoginArgs = {
    userName: string,
    password: string
}
export const login = async(_:void, args: LoginArgs, context: Context) => {
    const prisma = context.prisma;
    // Get user
    const user = await prisma.user.findFirst({
        where: {
            user_name: args.userName
        }
    });
    if(!user) throw new Error("NO_USER");
    // Get login details
    const login = await prisma.login.findFirst({
        where: {
            id_user: user.id_user
        }
    });
    if(!login) throw new Error("NO_PSW_TO_USER");
    // Compare passwords
    const passwordVerified = await comparePasswords(args.password, login.password);
    if(!passwordVerified) throw new Error("WRG_PSW");

    // Passwords are OK.
    const accessToken = createToken(user.id_user);
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
        accessToken, refreshToken
    }
}

type LogoutArgs = {
    userId: number
}
export const logout = async (_:void, args: LogoutArgs, context: Context) => {
    if(context.auth.getUserID() == null) throw new GQLError().notAuthorized();
    if(args.userId !== context.auth.getUserID()) throw new GQLError().notAuthorized();

    await context.prisma.refresh_token.deleteMany({
        where: {
            user_id_user: context.auth.getUserID() || 0
        }
    })
    return new GQLSuccess().success();
}

type RefreshArgs = {
    refreshToken: string
}
export const refresh = async(_:void, args: RefreshArgs, context: Context) => {
    const userId = await verifyRefreshToken(args.refreshToken);
    let requestUserId;
    try{
        requestUserId = context.auth.getUserID();
    } catch(err:any) {
        requestUserId = err.extensions?.data?.id_user;
    }
    if(userId !== requestUserId) throw new GQLError().notAuthorized();
    const tokenDb = await context.prisma.refresh_token.findFirst({
        where: {
            user_id_user: userId,
            token: args.refreshToken,
            time_valid_until: {
                gte: new Date()
            }
        }
    });
    if(!tokenDb) throw new GQLError().noMatches();

    // Refresh token exists and is valid.
    const accessToken = createToken(tokenDb.user_id_user);
    return accessToken;

}

const addDays = (date: Date, days: number) => {
    return new Date(date.valueOf()+24*60*60*1000*days);
}