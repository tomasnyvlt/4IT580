import { hashPassword } from "./use_cases/hashPassword";

type RegisterLoginArgs = {
    firstName: string,
    lastName: string,
    userName: string,
    email: string,
    password: string
}
export const registerLogin = async(_:void, args: RegisterLoginArgs, context: Context) => {
    const hashedPassword = hashPassword(args.password)
    //TO-DO Add user to the database
}