import { describe, it, expect, test } from "@jest/globals";
import { hashPassword, comparePasswords } from "./password.js"

describe('Password hashing', () => {
    test("Can convert password to other string", async () => {
        const hashed = await hashPassword("test123");
        expect(hashed).not.toBe("test123");
    });

    test("For empty password with length under 6 characters throw error", async () => {
        try{
            await hashPassword("test")
            expect(true).toBe(false)
        }
        catch(e:any){
            expect(e.message).toBe("Password must be longer than 6 characters.")
        }
    });

    test("Can hash a password and verify it", async () => {
        const password = "test123";
        const hashed = await hashPassword(password);
        const isSame = await comparePasswords(password, hashed);
        expect(isSame).toBe(true);
    })

});