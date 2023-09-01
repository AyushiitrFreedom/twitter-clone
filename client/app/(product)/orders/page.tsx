"use client";
import Spinner from '@/components/ui/spinner';
import { toast } from '@/components/ui/use-toast';
import { trpc } from '@/utils/trpc';
import router from 'next/navigation';
import React, { useEffect } from 'react'
import BlogCard from '@/components/ui/cartcard';
import OrderCard from '@/components/ui/ordercard';



function Cart() {
    let { data: orders, isLoading, isFetching, isError, error, refetch } = trpc.order.getallorders.useQuery(undefined, { retry: 1 });
    useEffect(() => {
        if (isError) {
            toast({
                variant: "destructive",
                title: error?.message,
            });

        }
    }, [isError, error, toast, router]);

    if (isLoading || isFetching) {
        return <Spinner />
    }


    if (orders === undefined || orders.length === 0) {
        return <div className="flex justify-center mt-8">No order found</div>
    }

    return (
        <>
            <h1 className="my-4 text-4xl text-center font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Cart</h1>
            <div className="flex justify-center ">

                <div className="max-w-3xl">
                    {orders.map((order) => (
                        <OrderCard
                            key={order.product_id}
                            title={order.product?.name as string}
                            content={order.product?.description as string}
                            imageUrl={order.product?.imageUrl as string}


                        />
                    ))}
                </div>
            </div>
        </>
    )
}

export default Cart;