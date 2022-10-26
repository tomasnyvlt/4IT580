import * as argon2 from 'argon2';

const argon2config = {
    type: argon2.argon2d,
    memoryCost: 2 ** 16,
    hashLength: 50
}

export const hashPassword = async(password:string) => {
    if(password.length < 6) throw new Error("Password must be longer than 6 characters.")
    return await argon2.hash(password, argon2config)
}