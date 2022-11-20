import dotenv from 'dotenv-flow';

dotenv.config();

export const MOCKS = process.env.MOCKS || "";
export const PORT:Number = Number.parseInt(process.env.PORT || "5000");
export const JWT_SECRET = process.env.JWT_SECRET || "test_secret";
export const REFRESH_SECRET = process.env.REFRESH_SECRET || "refresh";
export const DB_HOST = process.env.DB_HOST || "";
export const DB_PORT = process.env.DB_PORT || "";
export const DB_USER = process.env.DB_USER || "";
export const DB_PASSWORD = process.env.DB_PASSWORD || "";
export const DB_NAME = process.env.DB_NAME || "";
export const MAIL_HOST = process.env.MAIL_HOST || "";
export const MAIL_USER = process.env.MAIL_USER || "";
export const MAIL_PASSWORD = process.env.MAIL_PASSWORD || "";
export const VALIDATION_CODE_LENGTH = 6;
