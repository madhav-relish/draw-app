import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../../../.env") });
dotenv.config();

//@ts-ignore
export const JWT_SECRET = process.env.JWT_SECRET || '123123';