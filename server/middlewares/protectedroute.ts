import { TRPCError } from '@trpc/server';
import { middleware, publicProcedure } from '../trpc';
import passport from 'passport';
import { get } from 'http';
import jsonwebtoken, { JwtPayload, Secret } from 'jsonwebtoken';
import { User, user } from '../db/schema/Schema';
import { db } from '..';
import { eq } from 'drizzle-orm';


// const IsUser = middleware(async () => {
//     return passport.authenticate('jwt', { session: false })
// });

const IsUser = middleware(async (opts) => {
    let result: User[] = [];


    let token = opts.ctx.req.headers.authorization ? opts.ctx.req.headers.authorization.replace("Bearer", "") : undefined;
    console.log(opts.ctx.req.headers.authorization + "ab maja aega n bidu")
    if (token !== undefined) {

        try {
            const verify = jsonwebtoken.verify(token as string, process.env.JWT_SECRET as string);
            if (typeof verify !== 'string') {
                result = await db.select().from(user).where(eq(user.id, verify.id));

            }

        } catch (error) {
            console.log('le tu bhi le ye error' + error)
        }
    }

    if (!opts.ctx.req.isAuthenticated() && !result[0]) {
        console.log("yue kya hua")
        throw new TRPCError({
            code: 'UNAUTHORIZED',
            message: 'You must be logged in to do this',
        });

    }

    opts.ctx.req.user = result[0]
    return opts.next({
        ctx: {
            user: result[0]
        }
    });

}
);

export const userProcedure = publicProcedure.use(IsUser);


