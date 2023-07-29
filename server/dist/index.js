import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { drizzle } from "drizzle-orm/node-postgres";
import { router } from './routes/routes';
import pkg from 'pg';
const { Client } = pkg;
const client = new Client({
    host: "127.0.0.1",
    port: 5432,
    user: "fish_user",
    password: "password",
    database: "fish",
});
await client.connect();
export const db = drizzle(client);
const app = express();
const port = 5000;
app.use(cors());
// undefined
app.use(express.json());
dotenv.config();
// Available Routes
app.use("/", router);
// app.use("/api/notes", require("./routes/notes"));
app.listen(port, () => {
    console.log(`Example app listening on port ${process.env.EXPRESS_PORT}`);
});
//# sourceMappingURL=index.js.map