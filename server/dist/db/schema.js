import { pgTable, serial, varchar } from 'drizzle-orm/pg-core';
export const city = pgTable('city', {
    id: serial(' id'),
    name: varchar('name'),
});
//# sourceMappingURL=schema.js.map