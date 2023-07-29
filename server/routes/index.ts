import express from "express";
import { db } from "../index";
import { Cities, city, NewCity } from "../db/schema";
import { t } from "../trpc";


export const appRouter = t.router({
    show: t.procedure.query(async () => {
        const cities: Cities[] = await db.select().from(city);
        return cities;
    }),
    add: t.procedure.query(async () => {
        const insertUser = async (t: NewCity) => {
            return db.insert(city).values(t);
        }

        const newcity: NewCity = { id: 1, name: "Alef" };
        const result = await insertUser(newcity);
        return result;
    })
})