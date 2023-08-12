import type { Config } from "drizzle-kit";

export default {
    schema: "./db/schema/*",
    out: "./db",
    driver: 'pg',
    dbCredentials: {
        connectionString: process.env.DATABASE_CONNECTION_URL || "postgres://fish_user:password@localhost:5432/fish",
    }
} satisfies Config;