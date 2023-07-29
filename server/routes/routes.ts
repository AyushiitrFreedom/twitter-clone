import express from "express";
import { db } from "../index";
import { Cities, city, NewCity } from "../db/schema";

export const router = express.Router();
router.get("/show", async (req, res) => {
    const cities: Cities[] = await db.select().from(city);
    res.json(cities);
});

router.get("/add", async (req, res) => {
    const insertUser = async (t: NewCity) => {
        return db.insert(city).values(t);
    }

    const newcity: NewCity = { id: 1, name: "Alef" };
    const result = await insertUser(newcity);
    res.json(result);
}
)