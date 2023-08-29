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
    interface JwtPayload {
        id: string
    }
    let token = opts.ctx.req.headers.authorization ? opts.ctx.req.headers.authorization.replace("Bearer", "") : undefined;
    console.log(token + " teri meri meri teri")
    console.log(token)
    if (token !== null) {
        console.log('hi')
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
    console.log('hi')
    console.log(result[0])
    opts.ctx.req.user = result[0]
    return opts.next();

}
);

export const userProcedure = publicProcedure.use(IsUser);


