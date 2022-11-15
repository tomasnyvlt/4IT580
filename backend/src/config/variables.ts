import dotenv from 'dotenv-flow';

dotenv.config();

export const MOCKS = process.env.MOCKS || "";
export const PORT:Number = Number.parseInt(process.env.PORT || "5000");
export const JWT_SECRET = process.env.JWT_SECRET || "test_secret";
export const REFRESH_SECRET = process.env.REFRESH_SECRET || "refresh";
export const DB_NAME = process.env.DB_NAME || "";
export const MAIL_HOST = process.env.MAIL_HOST || "";
export const MAIL_USER = process.env.MAIL_USER || "";
export const MAIL_PASSWORD = process.env.MAIL_PASSWORD || "";
export const FRONTEND_URL = process.env.FRONTEND_URL || "";
export const VALIDATION_CODE_LENGTH = 6;
