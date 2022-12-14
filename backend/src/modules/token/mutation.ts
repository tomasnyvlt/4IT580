import { prisma } from '@prisma/client';
import { comparePasswords } from '../../libs/password.js';
import { createRefreshToken, createToken, verifyRefreshToken } from '../../libs/token.js';
import { GQLError } from '../../utils/return_statements/errors.js';
import { GQLSuccess } from '../../utils/return_statements/success.js';

type LoginArgs = {
    email: string,
    password: string
}
export const login = async(_:void, args: LoginArgs, context: Context) => {
    const prisma = context.prisma;
    // Get user
    const user = await prisma.user.findFirst({
        where: {
            email: args.email
        }
    });
    if(!user) throw new GQLError().noMatches();
    if(user.time_registered === null) throw new GQLError().notVerified();
    // Get login details
    const login = await prisma.login.findFirst({
        where: {
            id_user: user.id_user
        }
    });
    if(!login) throw new GQLError().noMatches();
    // Compare passwords
    const passwordVerified = await comparePasswords(args.password, login.password);
    if(!passwordVerified) throw new GQLError().invalidArgument("password");

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

export const logout = async (_:void, __:void, context: Context) => {
    if(context.auth.getUserID() == null) throw new GQLError().notAuthorized();

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