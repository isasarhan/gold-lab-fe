"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React, { FC } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "./validation";
import FormInput from "@/components/common/form/input";
import FormPassword from "@/components/common/form/password";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export interface LoginModuleProps {}

const LoginModule: FC<LoginModuleProps> = () => {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(loginSchema),
  });
  const { handleSubmit } = form;
  const onSubmit = async (data: { email: string; password: string }) => {
    const { email, password } = data;
    await signIn("credentials", {
      redirect: false,
      email,
      password,
    }).then(() => {
      toast.success("Logged In Successfully");
      router.push("/admin/dashboard");
    });
  };
  return (
    <Card className="lg:w-1/2 ">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Login</CardTitle>
        <CardDescription>
          Enter your credentials to access your account
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-4 flex flex-col gap-3">
          <FormInput
            control={form.control}
            name="email"
            label="Email"
            placeholder="Enter your email"
          />

          <FormPassword
            control={form.control}
            name="password"
            label="Password"
            placeholder="Enter your password"
          />

          <Button type="submit" className="w-full">
            Sign In
          </Button>
        </CardContent>
      </form>
    </Card>
  );
};

export default LoginModule;
