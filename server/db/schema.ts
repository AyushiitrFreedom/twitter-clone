import { InferModel } from 'drizzle-orm';
import { pgTable, serial, varchar } from 'drizzle-orm/pg-core';

export const city = pgTable('city2', {
    id: serial(' id'),
    name: varchar('name'),
});


export type Cities = InferModel<typeof city>;
export type NewCity = InferModel<typeof city, "insert">;