import express from "express";
import { db } from "../index";
import { city } from "../db/schema";
export const router = express.Router();
router.get("/", async (req, res) => {
    const cities = await db.select().from(city);
    res.json(cities);
});
router.get("/add", async (req, res) => {
    const insertUser = async (t) => {
        return db.insert(city).values(t);
    };
    const newcity = { id: 1, name: "Alef" };
    const result = await insertUser(newcity);
    res.json(result);
});
//# sourceMappingURL=routes.js.map