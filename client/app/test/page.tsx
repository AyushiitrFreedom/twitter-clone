"use client";
import { trpc } from "@/utils/trpc";
import React from "react";
export default function Page() {
    let { data: name, isLoading, isFetching, isError, error } = trpc.hello.useQuery();
    if (isError) {
        console.log(error + ' is not good');
        return <p>data is {isError} is not good</p>;
    };
    if (isLoading || isFetching) {
        return <p>Loading...</p>;
    }
    // console.log(data, isLoading, isFetching)
    return (
        <>
            <h1>he is  is my best friend</h1>
        </>
    )
}