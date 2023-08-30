"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";
import { trpc } from "@/utils/trpc";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Spinner from "@/components/ui/spinner";
export default function Page() {
    const router = useRouter();
    const { toast } = useToast()
    let { data: name, isLoading, isFetching, isError, error } = trpc.home.home.useQuery();
    useEffect(() => {
        if (isError) {
            toast({
                variant: "destructive",
                title: error?.message,
            });
            router.push('/login');
        }
    }, [isError, error, toast, router]);
    if (isLoading || isFetching) {
        return <Spinner />
    }

    // console.log(data, isLoading, isFetching)
    return (
        <>
            <h1>he is  is my best friend</h1>
            <Skeleton className="w-[100px] h-[20px] rounded-full" />
        </>
    )
}