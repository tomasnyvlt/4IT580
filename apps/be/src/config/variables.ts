import dotenv from 'dotenv-flow';

dotenv.config();


export const MOCKS = process.env.MOCKS || "";
export const PORT:Number = Number.parseInt(process.env.PORT || "5000");
export const JWT_SECRET = process.env.JWT_SECRET || "";
export const DB_HOST = process.env.DB_HOST || "";
export const DB_PORT = process.env.DB_PORT || "";
export const DB_USER = process.env.DB_USER || "";
export const DB_PASSWORD = process.env.DB_PASSWORD || "";
export const DB_NAME = process.env.DB_NAME || "";
