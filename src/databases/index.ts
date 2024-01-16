import { createPool } from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const host: string = process.env.DB_HOST!;
const port: string = process.env.DB_PORT!;
const user: string = process.env.DB_USER!;
const password: string = process.env.DB_PASSWORD!;
const database: string = process.env.DB_NAME!;

export const connection = createPool({
  host,
  port: parseInt(port),
  user,
  password,
  database,
});
