import { TRPCError } from '@trpc/server';
import { middleware, publicProcedure } from '../trpc';
// const IsUser = middleware(async () => {
//     return passport.authenticate('jwt', { session: false })
// });
const IsUser = middleware(async (opts) => {
    // console.log("req");
    // console.log(opts.ctx.req);
    // console.log("res");
    // console.log(opts.ctx.res);
    if (!opts.ctx.req.isAuthenticated()) {
        throw new TRPCError({
            code: 'UNAUTHORIZED',
            message: 'You must be logged in to do this',
        });
    }
    return opts.next();
});
export const userProcedure = publicProcedure.use(IsUser);
//# sourceMappingURL=protectedroute.js.map