import { pgTable, text, uuid, serial, integer, boolean } from 'drizzle-orm/pg-core';
import { InferModel } from 'drizzle-orm';


export const user = pgTable('users', {
    id: text('id').primaryKey().notNull(),
    email: text('email').notNull(),
    username: text('username').notNull(),
    password: text('password').notNull(),
    isSeller: boolean('isSeller').notNull(),
});

// Products Table
export const products = pgTable('products', {
    product_id: text('product_id').primaryKey(),
    name: text('name'),
    description: text('description'),
    price: integer('price'),
    seller_id: boolean('seller_id').default(false).references(() => user.id),
});

// Orders Table
export const orders = pgTable('orders', {
    order_id: text('order_id').primaryKey(),
    product_id: text('product_id').references(() => products.product_id),
    buyer_id: text('buyer_id').references(() => user.id),
    is_bought: boolean('is_bought'),
});

// Messages Table
export const messages = pgTable('messages', {
    message_id: text('message_id').primaryKey(),
    sender_id: text('sender_id').references(() => user.id),
    recipient_id: text('recipient_id').references(() => user.id),
    message: text('message'),
});



export type User = InferModel<typeof user>;
export type InsertUser = InferModel<typeof user, "insert">;