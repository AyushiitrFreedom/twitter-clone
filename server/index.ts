
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { NodePgDatabase, drizzle } from "drizzle-orm/node-postgres";
import { router } from './routes/routes';
import { migrate } from "postgres-migrations"
import * as trpcExpress from '@trpc/server/adapters/express';
import { appRouter } from './routes/index';

import pkg from 'pg';
import { a } from "drizzle-orm/column.d-aa4e525d";
const { Client } = pkg;


const client = new Client({
    host: "127.0.0.1",
    port: 5432,
    user: "myuser2",
    password: "1234",
    database: "twitterX",
});


await client.connect();
export const db = drizzle(client);
// await migrate({ client }, './db');trpc


const app = express();
app.use(cors())
// undefined
app.use(express.json());
dotenv.config();

// Available Routes
app.use("/", trpcExpress.createExpressMiddleware({ router: appRouter }));
// app.use("/api/notes", require("./routes/notes"));

app.listen(process.env.EXPRESS_PORT, () => {
    console.log(`Example app listening on port ${process.env.EXPRESS_PORT}`);
});

export type AppRouter = typeof appRouter;