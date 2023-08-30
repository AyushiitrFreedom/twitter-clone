import { publicProcedure, router } from "../trpc";
import { authRouter } from './auth';
import { homeRouter } from './home';
import { productRouter } from './product';
import { TRPCClientError } from "@trpc/client";
export const appRouter = router({
    auth: authRouter,
    home: homeRouter,
    hello: publicProcedure.query(async (opts) => {
        throw new TRPCClientError("hi");
    }),
    product: productRouter
});
//# sourceMappingURL=index.js.map