import { drizzle } from "drizzle-orm/node-postgres";
import { databaseUrl } from "../config.ts";

export const db = drizzle(databaseUrl);
