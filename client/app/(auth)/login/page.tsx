"use client"

import Link from "next/link"
import Image from 'next/image'
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

const formSchema = z.object({
    username: z.string().min(3, {
        message: "Username must be at least 2 characters.",
    }),
    password: z.string().min(6, {
        message: "password must be at least 6 characters.",
    }),
})

export default function AuthForm() {
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
        },
    })

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
    }
    return (
        <div className="flex justify-center items-center flex-col h-screen border-8">
            <Image className="pb-8" src={'/icon/Twitter-Logo.png'} alt="Twitter Logo" width={70} height={70} />
            <div className="mb-4 text-2xl font-bold">Sign in To Twitter</div>
            <Form {...form} >
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>

                                <div className="flex flex-col items-center ">
                                    <button className="block rounded-full bg-white border-solid border-2 py-3 px-8  my-4" type="submit">
                                        <div className="flex justify center">
                                            <Image className="pr-2" src={'/icon/Google-Logo.png'} alt="Google Logo" width={30} height={30} />
                                            <div className="text-black">Sign in With Google</div>
                                        </div>
                                    </button>
                                    <button className="block rounded-full bg-white border-solid border-2 py-3 px-8  my-4" type="submit">
                                        <div className="flex justify center">
                                            <Image className="pr-2" src={'/icon/Github-Logo.png'} alt="Github Logo" width={30} height={30} />
                                            <div className="text-black">Sign in With Github</div>
                                        </div>
                                    </button>
                                    <Separator className="my-4"></Separator>

                                    <FormControl>
                                        <Input placeholder="Phone , Email or username" className="max-w-xs mb-6" {...field} />
                                    </FormControl>
                                    <FormControl>
                                        <Input placeholder="password" className="max-w-xs" {...field} />
                                    </FormControl>
                                    <div className="my-[1rem]">
                                        <Button className=" rounded-full text-white mt-4" type="submit"><div className="py-3 px-[6rem] text-lg">Login</div></Button>
                                    </div>
                                    < Button type="submit" className=" bg-white border-solid border-2 rounded-full" > <div className="text-black">forgot password?</div></Button >
                                    <div className="mt-4">Don't have an acount? <span className="text-blue-700">Singup</span></div>
                                    <FormMessage />


                                </div>
                            </FormItem>

                        )
                        }
                    />

                </form >
            </Form >
        </div >

    )
}

