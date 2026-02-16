import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import React, { FC } from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { format, isValid } from "date-fns";

export interface FormDateProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  id?: string;
  label: string;
  placeholder: string;
  defaultValue?: Date;
}

const FormDate = <T extends FieldValues>({
  control,
  name,
  id,
  label,
  placeholder,
  defaultValue,
  ...props
}: FormDateProps<T>) => {
  const formId = id ?? name;

  return (
    <FieldGroup>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={formId}>{label}</FieldLabel>
            <div className="relative flex gap-2">
              <Input
                id="date"
                value={
                  field.value && isValid(field.value)
                    ? format(field.value, "dd/MM/yyyy")
                    : field.value
                }
                placeholder={format(new Date(), "dd/MM/yyyy")}
                className="bg-background pr-10"
                onChange={(e) => {
                  const date = e.target.value;
                  const [day, month, year] = date.split("/");

                  const validDate = new Date(
                    Number(year),
                    Number(month) - 1,
                    Number(day),
                  );

                  if (isValid(validDate)) field.onChange(validDate);
                  field.onChange(date);
                }}
              />
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="date-picker"
                    variant="ghost"
                    className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
                  >
                    <CalendarIcon className="size-3.5" />
                    <span className="sr-only">Select date</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    {...field}
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    captionLayout="dropdown"
                    {...props}
                  />
                </PopoverContent>
              </Popover>
            </div>

            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
    </FieldGroup>
  );
};

export default FormDate;
