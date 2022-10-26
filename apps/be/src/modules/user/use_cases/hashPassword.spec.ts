import { describe, it, expect, test } from "@jest/globals";
import { hashPassword } from "./hashPassword.js"

describe('Password hashing', () => {
    test("Converts password to other string", async () => {
        const hashed = await hashPassword("test123");
        expect(hashed).not.toBe("test123");
    })
    test("For empty password with length under 6 characters throw error", async () => {
        try{
            await hashPassword("test")
            expect(true).toBe(false)
        }
        catch(e:any){
            expect(e.message).toBe("Password must be longer than 6 characters.")
        }
    })
});