import { router } from "../trpc";
import { authRouter } from './auth';
import { homeRouter } from './home';
import { productRouter } from './product';
import { orderRouter } from './order';
export const appRouter = router({
    auth: authRouter,
    home: homeRouter,
    product: productRouter,
    order: orderRouter
});
//# sourceMappingURL=index.js.map