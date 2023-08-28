import express from "express";
import { db } from "../index";
import { user } from "../db/schema/userSchema";
import { publicProcedure, router } from "../trpc";
import { authRouter } from './auth';
import { homeRouter } from './home';


export const appRouter = router({

    auth: authRouter,
    home: homeRouter,
    hello: publicProcedure.query(async () => {
        return {
            status: "success",
        };
    }),

})
export type AppRouter = typeof appRouter;