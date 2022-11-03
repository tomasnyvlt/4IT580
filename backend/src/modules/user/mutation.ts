import { hashPassword } from "../../libs/password.js";
import { createRefreshToken, createToken } from "../../libs/token.js";
import { GQLError } from "../../utils/return_statements/errors.js";
import { GQLSuccess } from "../../utils/return_statements/success";
import yup from "yup";
import { registerLoginValidation } from "./validation.js";
import { sendMail, createRegistrationEmailContent } from "../../libs/email.js";
import { generateHashOfLength } from "../../libs/token.js";
import { VALIDATION_CODE_LENGTH } from "../../config/variables.js";
import { Prisma, registration_token } from "@prisma/client";

type RegisterLoginArgs = {
    firstName: string,
    lastName: string,
    email: string,
    password: string
}
export const registerLogin = async(_:void, args: RegisterLoginArgs, context: Context) => {
    const prisma = context.prisma;
    /// Validation block
    try{
        await registerLoginValidation.validate(args);
    } catch(err:any) {
        switch(err.path){
            case "password": {
                if(err.type == "min") throw new GQLError().wrongPasswordLength();
                throw new GQLError().invalidPasswordContent();
            }
            case "email": {
                throw new GQLError().invalidEmail();
            }
            case "firstName": {
                throw new GQLError().invalidArgument("firstName");
            }
            case "lastName": {
                throw new GQLError().invalidArgument("lastName");
            }
            default: {
                throw new GQLError().error(err.message, "ERR");
            }
        }
    }

    /// DB check
    const userEmail = await prisma.user.findFirst({
        where: {
            email: args.email
        }
    });
    if(userEmail) throw new GQLError().emailExists();

    /// Create new user in database.
    const hashedPassword = await hashPassword(args.password)
    const user = await prisma.user.create({
        data: {
            first_name: args.firstName,
            last_name: args.lastName,
            email: args.email,
            time_registered: null,
            time_last_login: null
        }
    });
    const login = await prisma.login.create({
        data: {
            id_user: user.id_user,
            password: hashedPassword
        }
    });

    /// Create confirmation key, store it and send it via email.
    await deleteOldConfirmationTokens(context.prisma);
    // Generate keys until unique.
    let exists = true
    let confKey = "";
    while(exists){
        confKey = generateHashOfLength(VALIDATION_CODE_LENGTH);
        exists = (await prisma.registration_token.findFirst({where: {token: confKey}})) != null;
    }
    // Store key.
    await prisma.registration_token.create({
        data:{
            id_user: user.id_user,
            token: confKey,
            valid_until: addMinutes(new Date(), 30)
        }
    })
    // Send email.
    await sendMail({
        recipient: args.email,
        subject: "Sportify - confirm your registration",
        content: createRegistrationEmailContent(args.firstName, args.lastName, confKey)
    });
    
    return new GQLSuccess().registrationCompleted();
}

type ConfirmRegistrationArgs = {
    confirmationCode: string
}
export const confirmRegistration = async(_:void, args: ConfirmRegistrationArgs, context: Context) => {
    if(args.confirmationCode.length !== VALIDATION_CODE_LENGTH) throw new GQLError().invalidArgument("confirmationCode");
    await deleteOldConfirmationTokens(context.prisma);
    // Find token.
    const dbRow = await context.prisma.registration_token.findFirst({
        where: {
            token: args.confirmationCode
        }
    });
    if(dbRow === null) throw new GQLError().noMatches();

    await context.prisma.user.update({
        where: {
            id_user: dbRow.id_user
        },
        data: {
            time_registered: new Date()
        }
    });

    await context.prisma.registration_token.delete({
        where: {
            token: args.confirmationCode
        }
    });

    const accessToken = createToken(dbRow.id_user);
    const refreshToken = createRefreshToken(dbRow.id_user);


    const expiredTokens = await context.prisma.registration_token.findMany({
        where: {
            valid_until: {
                lte: new Date()
            }
        }
    });
    

    return {
        accessToken,
        refreshToken
    }
}

const deleteOldConfirmationTokens = async (prisma:any) => {
    const now = new Date()
    // Get expired tokens.
    const expiredTokens = await prisma.registration_token.findMany({
        where: {
            valid_until: {
                lte: now
            }
        }
    });
    // Delete all users that didnt confirm registration.
    expiredTokens.forEach(async (token:registration_token) => {
        const user = await prisma.user.findFirst({where: {id_user: token.id_user}});
        // If time registered is NULL means that user didnt confirm their registration.
        if(user?.time_registered === null){
            await prisma.login.deleteMany({where: {id_user: token.id_user}});
            await prisma.user.deleteMany({where: {id_user: token.id_user}});
        } 
    });
    // Delete expired tokens.
    await prisma.registration_token.deleteMany({
        where: {
            valid_until: {
                lte: now
            }
        }
    });
}
const addDays = (date: Date, days: number) => {
    return new Date(date.valueOf()+24*60*60*1000*days);
}
const addMinutes = (date: Date, minutes: number) => {
    return new Date(date.valueOf()+60*1000*minutes);
}


const emailPatern = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
