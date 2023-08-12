import { TRPCError } from '@trpc/server';
import { middleware, publicProcedure } from '../trpc';
import passport from 'passport';


// const IsUser = middleware(async () => {
//     return passport.authenticate('jwt', { session: false })
// });

const IsUser = middleware(async (opts) => {
    console.log(opts.ctx.req);
    if (!opts.ctx.req.isAuthenticated()) {
        opts.ctx.res.redirect('/auth/login');
        throw new TRPCError({
            code: 'UNAUTHORIZED',
            message: 'You must be logged in to do this',
        });

    }
    return opts.next();

}
);

export const userProcedure = publicProcedure.use(IsUser);