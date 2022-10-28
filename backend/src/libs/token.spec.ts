import { describe, it, expect, test } from "@jest/globals";
import { createAppUser } from "../types/AppUser.js";
import { stripTokenFromHeader, verifyTokenFromHeader, createToken, verifyToken, createRefreshToken, verifyRefreshToken } from "./token.js"

const testTokenContent = createAppUser(10);

describe("JWT handler", () => {
    test("Parse authentization header", () => {
        const header = "Bearer TestString";
        expect(stripTokenFromHeader(header)).toBe("TestString")
    })

    test("Empty authentization string should return empty string", () => {
        expect(stripTokenFromHeader(undefined)).toBe('')
    })

    test("Can create token", () => {
        expect(createToken(testTokenContent.getUserID() || 0).length).toBeGreaterThan(0)
    })

    test("Can create token and can verify it", async () => {
        const token = createToken(testTokenContent.getUserID() || 0);
        const verified = await verifyToken(token)
        expect(verified.getUserID()).toBe(testTokenContent.getUserID())
    })

    test("Can parse authorization header", async () => {
        const token = createToken(testTokenContent.getUserID() || 0);
        const header = `Bearer ${token}`;
        const verified = await verifyTokenFromHeader(header);
        expect(verified.getUserID()).toBe(testTokenContent.getUserID());
    })

    test("Should return loggedIn as false if authorization header is empty", async () => {
        const verified = await verifyTokenFromHeader(undefined);
        expect(verified.isLoggedIn()).toBe(false);
    })

    test("If somehow authorization header is array return loggedIn as false and id as null", async () => {
        const verified = await verifyTokenFromHeader(["Bearer 123", "Bearer 456"]);
        expect(verified.isLoggedIn()).toBe(false);
    })

    test("Can create refresh token for user", () => {
        const token = createRefreshToken(testTokenContent);
        expect(token).toBeDefined();
    })

    test("Verified data from refresh token are the same", async () => {
        const token = createRefreshToken(testTokenContent);
        const verified = await verifyRefreshToken(token);
        expect(verified).toBe(testTokenContent.getUserID());
    })

})