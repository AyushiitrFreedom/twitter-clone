import { pgTable, text } from 'drizzle-orm/pg-core';
export const user = pgTable('users', {
    id: text('id').primaryKey().notNull(),
    email: text('email').notNull(),
    username: text('username').notNull(),
    password: text('password').notNull(),
});
//# sourceMappingURL=userSchema.js.map