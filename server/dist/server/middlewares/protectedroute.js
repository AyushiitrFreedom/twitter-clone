import { TRPCError } from '@trpc/server';
import { middleware, publicProcedure } from '../trpc';
import jsonwebtoken from 'jsonwebtoken';
import { user } from '../db/schema/Schema';
import { db } from '..';
import { eq } from 'drizzle-orm';
// const IsUser = middleware(async () => {
//     return passport.authenticate('jwt', { session: false })
// });
const IsUser = middleware(async (opts) => {
    let result = [];
    let token = opts.ctx.req.headers.authorization ? opts.ctx.req.headers.authorization.replace("Bearer", "") : undefined;
    if (token !== null) {
        console.log('hi');
        try {
            const verify = jsonwebtoken.verify(token, process.env.JWT_SECRET);
            if (typeof verify !== 'string') {
                result = await db.select().from(user).where(eq(user.id, verify.id));
            }
        }
        catch (error) {
            console.log('le tu bhi le ye error' + error);
        }
    }
    if (!opts.ctx.req.isAuthenticated() && !result[0]) {
        console.log("yue kya hua");
        throw new TRPCError({
            code: 'UNAUTHORIZED',
            message: 'You must be logged in to do this',
        });
    }
    console.log('hi');
    console.log(result[0]);
    opts.ctx.req.user = result[0];
    return opts.next({
        ctx: {
            user: result[0]
        }
    });
});
export const userProcedure = publicProcedure.use(IsUser);
//# sourceMappingURL=protectedroute.js.map