import { pgTable, text, integer, boolean } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
export const user = pgTable('buyers', {
    id: text('id').primaryKey().notNull(),
    email: text('email').notNull(),
    username: text('username').notNull(),
    password: text('password').notNull(),
    isSeller: boolean('isSeller').default(true).notNull(),
});
// Products Table
export const product = pgTable('products', {
    product_id: text('product_id').primaryKey(),
    name: text('name'),
    description: text('description'),
    price: integer('price'),
    seller_id: text('seller_id').notNull().references(() => user.id),
    imageUrl: text('imageUrl')
});
// Orders Table
export const order = pgTable('order', {
    order_id: text('order_id').primaryKey(),
    product_id: text('product_id').references(() => product.product_id),
    buyer_id: text('buyer_id').references(() => user.id),
    is_bought: boolean('is_bought'),
});
export const orderRelations = relations(order, ({ one }) => ({
    product: one(product, {
        fields: [order.product_id],
        references: [product.product_id],
    }),
})); // Messages Table
export const message = pgTable('message', {
    message_id: text('message_id').primaryKey(),
    sender_id: text('sender_id').references(() => user.id),
    recipient_id: text('recipient_id').references(() => user.id),
    message: text('message'),
});
//# sourceMappingURL=Schema.js.map