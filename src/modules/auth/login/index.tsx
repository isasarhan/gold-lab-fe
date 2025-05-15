'use client'
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import React, { FC } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from './validation';
import { Form } from '@/components/ui/form';
import { useUserContext } from '@/providers/UserProvider';
import FormInput from '@/components/common/form/input';
import FormPassword from '@/components/common/form/password';

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

                        <FormPassword
                            control={form.control}
                            name="password"
                            title="Password"
                            placeholder="Enter your password" />
                            
                        <Button type="submit" className="w-full">
                            Sign In
                        </Button>
                    </CardContent>
                </form>
            </Form>
        </Card>
    );
};

export default LoginModule;