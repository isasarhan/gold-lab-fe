"use client";
import { Button } from "@/components/ui/button";
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

const DiamondIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 32 32" className={className} fill="currentColor">
    <path d="M16 2 L28 12 L16 30 L4 12 Z" />
    <path d="M4 12 L10 6 L16 2 L22 6 L28 12 Z" opacity="0.5" />
  </svg>
);

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
    <div className="flex min-h-screen w-full">
      {/* ── Left branding panel ── */}
      <div className="relative hidden lg:flex lg:w-[45%] flex-col items-center justify-center overflow-hidden bg-sidebar px-12">
        {/* Decorative blobs */}
        <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-primary/10" />
        <div className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-primary/8" />
        {/* Fine grid texture */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)",
            backgroundSize: "40px 40px",
            color: "var(--sidebar-foreground)",
          }}
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center gap-8 text-center">
          {/* Badge */}
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-primary/30 bg-primary/15 text-primary shadow-lg shadow-primary/10">
            <DiamondIcon className="h-10 w-10" />
          </div>

          <div>
            <h1 className="text-4xl font-bold tracking-wide text-primary">
              Gold Lab
            </h1>
            <p className="mt-2 text-xs tracking-[0.3em] uppercase text-sidebar-foreground/50">
              Management System
            </p>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 w-40">
            <div className="h-px flex-1 bg-primary/25" />
            <DiamondIcon className="h-3 w-3 text-primary/50" />
            <div className="h-px flex-1 bg-primary/25" />
          </div>

          <blockquote className="max-w-65 text-sm italic leading-relaxed text-sidebar-foreground/60">
            "Crafting excellence in every karat — precision management for the
            finest jewelry."
          </blockquote>

          {/* Bottom badges */}
          <div className="mt-4 flex gap-3">
            {["Gold", "Silver", "Diamonds"].map((item) => (
              <span
                key={item}
                className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary/80"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Right form panel ── */}
      <div className="flex flex-1 flex-col items-center justify-center bg-background px-6 py-12">
        {/* Mobile logo */}
        <div className="mb-10 flex flex-col items-center gap-3 lg:hidden">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-primary/25 bg-primary/15 text-primary">
            <DiamondIcon className="h-7 w-7" />
          </div>
          <h1 className="text-2xl font-bold text-primary">Gold Lab</h1>
        </div>

        <div className="w-full max-w-sm">
          {/* Heading */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-foreground">Welcome back</h2>
            <p className="mt-1.5 text-sm text-muted-foreground">
              Sign in to your Gold Lab account to continue
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <FormInput
              control={form.control}
              name="email"
              label="Email"
              placeholder="you@example.com"
            />

            <FormPassword
              control={form.control}
              name="password"
              label="Password"
              placeholder="••••••••"
            />

            <Button
              type="submit"
              className="mt-2 h-11 w-full text-base font-semibold"
            >
              Sign In
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginModule;
