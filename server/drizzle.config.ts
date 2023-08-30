import type { Config } from "drizzle-kit";

export default {
    schema: "./db/schema/*",
    out: "./db",
    driver: 'pg',
    dbCredentials: {
        connectionString: process.env.DATABASE_CONNECTION_URL || "postgres://myuser2:1234@localhost:5432/twitterX",
    }
} satisfies Config;