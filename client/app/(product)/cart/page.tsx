"use client";
import Spinner from '@/components/ui/spinner';
import { toast } from '@/components/ui/use-toast';
import { trpc } from '@/utils/trpc';
import router from 'next/navigation';
import React, { useEffect } from 'react'
import BlogCard from '@/components/ui/cartcard';



function Cart() {
    const utils = trpc.useContext();
    let { data: orders, isLoading, isFetching, isError, error, refetch } = trpc.order.getallcart.useQuery(undefined, { retry: 1 });
    let mutation = trpc.order.delete.useMutation({
        onSuccess: (data) => {
            toast({
                variant: "success",
                title: data?.status,
            });
            refetch();

        },
        onError: (error) => {
            toast({
                variant: "destructive",
                title: error.message,
            });

        }
    })
    let buyMutation = trpc.order.updateorder.useMutation({
        onSuccess: (data) => {
            toast({
                variant: "success",
                title: data?.status,
            });
            refetch();

        },
        onError: (error) => {
            toast({
                variant: "destructive",
                title: error.message,
            });

        }
    })
    useEffect(() => {
        refetch();
        if (isError) {
            toast({
                variant: "destructive",
                title: error?.message,
            });

        }
    }, [isError, error, toast, router, orders]);

    if (isLoading || isFetching) {
        return <Spinner />
    }
    const onDelete = (id: string) => {
        mutation.mutate({ orderId: id })
    }
    const Buy = (id: string) => {
        console.log("buy")
        buyMutation.mutate({ orderId: id })
    }

    if (orders === undefined || orders.length === 0) {
        return <div className="flex justify-center mt-8">Cart is Empty</div>
    }
    console.log(orders[0].product?.name + "tan tana tan tan tan tara")
    return (

        <>
            <h1 className="my-4 text-4xl text-center font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Cart</h1>
            <div className="flex justify-center ">

                <div className="max-w-3xl">
                    {orders.map((order) => (
                        <BlogCard
                            key={order.product_id}
                            title={order.product?.name as string}
                            content={order.product?.description as string}
                            imageUrl={order.product?.imageUrl as string}
                            onDelete={onDelete}
                            orderId={order.order_id}
                            Buy={Buy}
                        />
                    ))}
                </div>
            </div>
        </>
    )
}

export default Cart;