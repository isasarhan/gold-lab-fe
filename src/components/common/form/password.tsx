"use client";

import { FC, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Control, FieldValues, Path } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface FormPasswordProps<
  T extends FieldValues,
> extends React.ComponentProps<"input"> {
  id?: string;
  label?: string;
  placeholder?: string;
  className?: string;
  required?: boolean;
  disabled?: boolean;
  control: Control<T>;
  name: Path<T>;
  title: string;
}

const FormPassword = <T extends FieldValues>({
  id = "password",
  label = "Password",
  placeholder = "Enter your password",
  className,
  required = false,
  disabled = false,
  name,
  control,
  title,
  ...props
}: FormPasswordProps<T>) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex-1 w-full">
          <FormLabel>{title}</FormLabel>
          <FormControl>
            <div className="relative">
              <Input
                {...field}
                {...props}
                type={showPassword ? "text" : "password"}
                id={id}
                placeholder={placeholder}
                className={cn("pr-10", className)}
                required={required}
                disabled={disabled}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full px-3 py-2 text-gray-400 hover:text-gray-600"
                onClick={togglePasswordVisibility}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
                <span className="sr-only">
                  {showPassword ? "Hide password" : "Show password"}
                </span>
              </Button>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormPassword;
