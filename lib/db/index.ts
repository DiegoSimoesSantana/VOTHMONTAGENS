import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "./schema";

const connectionString = process.env.DATABASE_URL?.trim();
const databaseConfigErrorMessage =
  "DATABASE_URL nao configurada. Defina essa variavel em .env.local e execute `npm run db:push` para criar as tabelas.";

export const hasDatabaseConfig = Boolean(connectionString);
export { databaseConfigErrorMessage };

export function getDb() {
  if (!connectionString) {
    throw new Error(databaseConfigErrorMessage);
  }

  return drizzle(neon(connectionString), { schema });
}
