'use client'
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import React, { FC } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from './validation';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useUserContext } from '@/providers/UserProvider';
import FormInput from '@/components/common/form/input';

export interface LoginModuleProps { }

const LoginModule: FC<LoginModuleProps> = () => {
    const form = useForm({
        resolver: zodResolver(loginSchema)
    })
    const { signIn } = useUserContext()
    const { handleSubmit } = form
    const onSubmit = async (data: { email: string, password: string }) => {
        const { email, password } = data
        await signIn(email, password)
    }
    return (
        <Card className="w-1/2">
            <CardHeader>
                <CardTitle className="text-2xl font-bold">Login</CardTitle>
                <CardDescription>Enter your credentials to access your account</CardDescription>
            </CardHeader>
            <Form {...form}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <CardContent className="space-y-4">
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
                    </CardContent>
                    <CardFooter>
                        <Button type="submit" className="w-full">
                            Sign In
                        </Button>
                    </CardFooter>
                </form>
            </Form>
        </Card>
    );
};

export default LoginModule;