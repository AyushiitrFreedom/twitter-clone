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


export const authRouter = router({
    register: publicProcedure.query(async (opts) => {

        const newUser = async (t: InsertUser) => {
            return db.insert(user).values(t);
        }
        console.log(opts);

        const userPassword = await GeneratePassword(opts.ctx.req.body.password);

        const newuser: InsertUser = { username: opts.ctx.req.body.username, email: opts.ctx.req.body.email, password: userPassword, id: uuidv4() };
        const result = await newUser(newuser);
        console.log(result);
        const token = jwtMaker({ id: newuser.id });
        if (result) {
            return {
                status: "success",
                token: "Bearer" + token,
            };
        }
        else {
            return {
                status: "error",
                message: "error while making the user",
            };
        }

    }),
    login: publicProcedure.query(async (opts) => {
        try {
            const { id, username, password } = opts.ctx.req.body;

            // Check if user with the given username exists
            const existingUser = await db.select().from(user).where(eq(user.id, id));
            if (!existingUser) {
                return {
                    status: "error",
                    message: "User not found",
                };
            }

            // Compare the provided password with the stored hash
            const passwordMatch = await bcryptjs.compare(password, existingUser[0].password);

            if (!passwordMatch) {
                return {
                    status: "error",
                    message: "Invalid password",
                };
            }

            // Generate and send JWT token
            const token = jwtMaker({ id: existingUser[0].id });
            return {
                status: "success",
                token: "Bearer " + token,
            };

        } catch (error) {
            return {
                status: "error",
                message: "An error occurred during login",
            };
        }

    }),
    test: publicProcedure.query(async (opts) => {
        const result: User[] = await db.select().from(user).where(eq(user.email, "KJHIGF"));
        console.log(!result[0]);
    }),
    logout: publicProcedure.query(async (opts) => {
        opts.ctx.req.logout(function (err) {
            if (err) { return (err); }
        });
    }),

})

