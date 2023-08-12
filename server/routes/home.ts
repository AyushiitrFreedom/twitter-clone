import { Console, error } from 'console';
import { user, User, InsertUser } from '../db/schema/userSchema';
import { db } from "../index";
import bcryptjs from 'bcryptjs'
import { publicProcedure, router } from "../trpc";
import GeneratePassword from "../utils/func/passwordGenerator";
import jwtMaker from "../utils/func/jwtMaker";
import { v4 as uuidv4 } from 'uuid';
import { eq } from 'drizzle-orm';
import passport from 'passport';
import { userProcedure } from '../middlewares/protectedroute';


export const homeRouter = router({
    register: userProcedure.query(async (opts) => {
        console.log(opts.ctx.req.user);
        console.log("protected route");
    })

});




