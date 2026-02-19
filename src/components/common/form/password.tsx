"use client";

import { FC, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";

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
  ...props
}: FormPasswordProps<T>) => {
  const formId = id ?? name;

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <FieldGroup>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={formId}>{label}</FieldLabel>
            <div>
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
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
    </FieldGroup>
  );
};

export default FormPassword;
