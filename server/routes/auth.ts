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
import { string, z } from 'zod';
import { TRPCClientError } from '@trpc/client';
import CustomError from '../utils/errors/customerror';
import RegisterSchema from "../../client/utils/zod-schemas/RegisterSchema";


export const authRouter = router({
    register: publicProcedure.input(
        z.object({
            username: z.string().nonempty("Username is required"),
            email: z.string().email("Invalid email address"),
            password: z.string().min(8, 'Password must be at least 8 characters.')
                .refine((value: string) => /[A-Z]/.test(value), 'Password must contain at least one capital letter.')
                .refine((value: string) => /[a-z]/.test(value), 'Password must contain at least one small letter.')
                .refine((value: string) => /[!@#$%^&*()_+{}\[\]:;<>,.?~\-=/\\|]/.test(value), 'Password must contain at least one special character.')
                .refine((value: string) => /\d/.test(value), 'Password must contain at least one number.')
        })
    ).mutation(async (opts) => {
        //checking for existing user
        const existingUser = await db.select().from(user).where(eq(user.email, opts.input.email));
        console.log(existingUser)
        if (existingUser[0]) {
            throw new TRPCClientError("user allready exist")
        }
        const newUser = async (t: InsertUser) => {
            return db.insert(user).values(t);
        }
        console.log(opts);

        const userPassword = await GeneratePassword(opts.input.password);

        const newuser: InsertUser = { username: opts.input.username, email: opts.input.email, password: userPassword, id: uuidv4() };
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
            throw new TRPCClientError("Server Error")
        }

    }),
    login: publicProcedure.input(z.object({
        email: z.string().email("Invalid email address"),
        password: z.string().min(8, 'Password must be at least 8 characters.')
            .refine((value) => /[A-Z]/.test(value), 'Password must contain at least one capital letter.')
            .refine((value) => /[a-z]/.test(value), 'Password must contain at least one small letter.')
            .refine((value) => /[!@#$%^&*()_+{}\[\]:;<>,.?~\-=/\\|]/.test(value), 'Password must contain at least one special character.')
            .refine((value) => /\d/.test(value), 'Password must contain at least one number.')
    })).mutation(async (opts) => {
        try {
            const { email, password } = opts.input;

            // Check if user with the given username exists
            const existingUser = await db.select().from(user).where(eq(user.email, email));
            if (!existingUser) {
                throw new TRPCClientError("User not found")
            }

            // Compare the provided password with the stored hash
            const passwordMatch = await bcryptjs.compare(password, existingUser[0].password);

            if (!passwordMatch) {
                throw new TRPCClientError("Invalid password")
            }

            // Generate and send JWT token
            const token = jwtMaker({ id: existingUser[0].id });
            return {
                status: "success",
                token: "Bearer" + token,
            };

        } catch (error) {
            let errorMessage = "Failed to do something exceptional";
            if (error instanceof Error) {
                errorMessage = error.message;
            }
            throw new TRPCClientError("server error")
        }

    }),
    test: publicProcedure.query(async (opts) => {
        const result: User[] = await db.select().from(user).where(eq(user.email, "ayush_g@ar.iitr.ac.in"));
        console.log(!result[0]);
        return result
    }),
    logout: publicProcedure.query(async (opts) => {
        opts.ctx.req.logout(function (err) {
            if (err) { return (err); }
        });
    }),
    hello: publicProcedure.query(async (opts) => {
        return {
            status: "success",
        };
    }),


})

