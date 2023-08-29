import express from "express";
import { db } from "../index";
import { user } from "../db/schema/userSchema";
import { publicProcedure, router } from "../trpc";
import { authRouter } from './auth';
import { homeRouter } from './home';
import { string, z } from "zod";
import { TRPCClientError } from "@trpc/client";


export const appRouter = router({

    auth: authRouter,
    home: homeRouter,
    hello: publicProcedure.query(async (opts) => {
        throw new TRPCClientError("hi")
    }),

})
export type AppRouter = typeof appRouter;