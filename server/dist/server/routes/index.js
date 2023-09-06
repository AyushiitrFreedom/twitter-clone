import { router } from "../trpc";
import { authRouter } from './auth';
import { productRouter } from './product';
import { orderRouter } from './order';
import { messageRouter } from './message';
export const appRouter = router({
    auth: authRouter,
    product: productRouter,
    order: orderRouter,
    message: messageRouter,
});
//# sourceMappingURL=index.js.map