"use client"
import { useForm, type SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { formSchema } from "./validation"
import useAuth from "@/services/auth"
import React, { FC } from 'react';
import { toast } from "sonner"
import FormInput from "@/components/common/form/input"

export interface RegisterModuleProps { }

const RegisterModule: FC<RegisterModuleProps> = () => {
    const { register } = useAuth()

    type FormData = z.infer<typeof formSchema>

    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),

    })

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        await register(data).then(() =>
            toast.success("Registered successfully!")
        ).catch((e) =>
            toast.error(`${e.message}`)
        )
    };


    return (
        <Card className="w-1/2">
            <CardContent className=" space-y-4">
                <Form {...form} >
                    <form onSubmit={form.handleSubmit(onSubmit)} className="mx-auto space-y-3">
                        <FormInput
                            control={form.control}
                            name="username"
                            title="User Name"
                            placeholder="Enter user name" />
                        <FormInput
                            control={form.control}
                            name="firstName"
                            title="First Name"
                            placeholder="Enter first name" />

                        <FormInput
                            control={form.control}
                            name="lastName"
                            title="Last Name"
                            placeholder="Enter first name" />

                        <FormInput
                            control={form.control}
                            name="phone"
                            title="Phone"
                            placeholder="Enter phone number" />

                        <FormInput
                            control={form.control}
                            name="email"
                            title="Email"
                            placeholder="Enter your email" />

                        <FormInput
                            control={form.control}
                            name="password"
                            title="Password"
                            type="password"
                            placeholder="Enter your password" />
                        <Button type="submit">Submit</Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}

export default RegisterModule;
