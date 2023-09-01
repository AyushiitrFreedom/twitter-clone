import { z } from 'zod';
import { userProcedure } from '../middlewares/protectedroute';
import { router } from '../trpc';
import { db } from '..';
import { TRPCClientError } from '@trpc/client';
import { v4 as uuidv4 } from 'uuid';
import { order } from '../db/schema/Schema';
export const orderRouter = router({
    add: userProcedure.input(z.object({
        id: z.string().nonempty("id is required"),
    })).mutation(async (opts) => {
        //checking for existing user
        try {
            const newOrder = async (t) => {
                return db.insert(order).values(t);
            };
            const neworder = { is_bought: false, order_id: uuidv4(), buyer_id: opts.ctx.user.id, product_id: opts.input.id };
            const result = await newOrder(neworder);
            if (result) {
                return {
                    status: "success",
                };
            }
        }
        catch (error) {
            let errorMessage = "Failed to do something exceptional";
            if (error instanceof Error) {
                errorMessage = error.message;
            }
            throw new TRPCClientError(errorMessage);
        }
    }),
    getall: userProcedure.input(z.object({
        id: z.string().nonempty("id is required"),
    })).query(async (opts) => {
        try {
            const orders = await db.select().from(order);
            if (!orders[0]) {
                throw new TRPCClientError("No orders Found");
            }
            return orders;
        }
        catch (error) {
            let errorMessage = "Failed to do something exceptional";
            if (error instanceof Error) {
                errorMessage = error.message;
            }
            throw new TRPCClientError(errorMessage);
        }
    }),
});
//# sourceMappingURL=order.js.map