import { createRequire } from 'module';
const require = createRequire(import.meta.url);

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { NodePgDatabase, drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "postgres-migrations"
import { createExpressMiddleware } from '@trpc/server/adapters/express';
import { appRouter } from './routes/index';

import pkg from 'pg';
import { a } from "drizzle-orm/column.d-aa4e525d";
import { createContext } from "./context";
import session from "express-session";
const { Client } = pkg;
import genFunc from 'connect-pg-simple';
import passport from "passport";
import('./middlewares/passport');

const PostgresqlStore = genFunc(session);
const sessionStore = new PostgresqlStore({
    conString: 'postgres://myuser2:1234@localhost:5432/twitterX',
    createTableIfMissing: true,
});


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
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
    store: sessionStore,
}));

app.use(passport.initialize())
app.use(passport.session())
app.use('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
app.get('/auth/callback',
    passport.authenticate('google', { failureRedirect: 'http://localhost:3000/login' }), function (req: express.Request, res) {
        // Successful authentication, redirect or respond as needed
        const user = req.user as any;
        const session = req.session;
        console.log("session");
        console.log(session);
        console.log("user");
        console.log(user._json);
        res.redirect('http://localhost:3000/');
    });

// Available Routes
app.use("/", createExpressMiddleware({ router: appRouter, createContext }));
// app.use("/api/notes", require("./routes/notes"));

app.listen(process.env.EXPRESS_PORT, () => {
    console.log(`Example app listening on port ${process.env.EXPRESS_PORT}`);
});

export type AppRouter = typeof appRouter;