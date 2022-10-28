import { describe, it, expect, test } from "@jest/globals";
import { stripTokenFromHeader, verifyTokenFromHeader, createToken, verifyToken } from "./token.js"

const testTokenContent = { loggedIn: true, id_user: 1}

describe("JWT handler", () => {
    test("Parse authentization header", () => {
        const header = "Bearer TestString";
        expect(stripTokenFromHeader(header)).toBe("TestString")
    })

    test("Empty authentization string should return empty string", () => {
        expect(stripTokenFromHeader(undefined)).toBe('')
    })

    test("Can create token", () => {
        expect(createToken(testTokenContent).length).toBeGreaterThan(0)
    })

    test("Can create token and can verify it", () => {
        const token = createToken(testTokenContent);
        const verified = verifyToken(token)
        expect(verified.id_user).toBe(testTokenContent.id_user)
    })

    test("Can parse authorization header", () => {
        const token = createToken(testTokenContent);
        const header = `Bearer ${token}`;
        const verified = verifyTokenFromHeader(header);
        expect(verified.id_user).toBe(testTokenContent.id_user);
    })

    test("Should return loggedIn as false if authorization header is empty", () => {
        const verified = verifyTokenFromHeader(undefined);
        expect(verified.loggedIn).toBe(false);
    })

    test("If somehow authorization header is array return loggedIn as false and id as null", () => {
        const verified = verifyTokenFromHeader(["Bearer 123", "Bearer 456"]);
        expect(verified.loggedIn).toBe(false);
    })

})