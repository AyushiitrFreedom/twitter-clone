import type { Config } from "drizzle-kit";

export default {
    schema: "./db/schema/*",
    out: "./db",
    driver: 'pg',
    dbCredentials: {
        connectionString: `postgres://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@localhost:5432/${process.env.DATABASE}`,
    }
} satisfies Config;