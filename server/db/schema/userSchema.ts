import { pgTable, text, uuid, serial } from 'drizzle-orm/pg-core';
import { InferModel } from 'drizzle-orm';


export const user = pgTable('users', {
    id: text('id').primaryKey().notNull(),
    email: text('email').notNull(),
    username: text('username').notNull(),
    password: text('password').notNull(),
});

export type User = InferModel<typeof user>;
export type InsertUser = InferModel<typeof user, "insert">;