import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import type { Config } from "drizzle-kit";

function readEnvFileValue(name: string) {
  const envFilePath = resolve(process.cwd(), ".env.local");

  if (!existsSync(envFilePath)) {
    return undefined;
  }

  const envFile = readFileSync(envFilePath, "utf8");

  for (const rawLine of envFile.split(/\r?\n/)) {
    const line = rawLine.trim();

    if (!line || line.startsWith("#")) {
      continue;
    }

    const separatorIndex = line.indexOf("=");

    if (separatorIndex === -1) {
      continue;
    }

    const key = line.slice(0, separatorIndex).trim();
    if (key !== name) {
      continue;
    }

    return line.slice(separatorIndex + 1).trim().replace(/^['"]|['"]$/g, "");
  }

  return undefined;
}

const databaseUrl = process.env.DATABASE_URL || readEnvFileValue("DATABASE_URL") || "";

export default {
  schema: "./lib/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: databaseUrl,
  },
  verbose: true,
  strict: true,
} satisfies Config;
