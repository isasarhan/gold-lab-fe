import React, { FC } from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import Autocomplete from "@/components/ui/autocomplete";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";

export interface FormAutocompleteProps<T extends FieldValues> {
  id?: string;
  label: string;
  control: Control<T>;
  name: Path<T>;
  placeholder: string;
  className?: string;
  options: { label: string; value: any }[];
}

const FormAutocomplete = <T extends FieldValues>({
  id,
  options,
  control,
  name,
  className,
  label,
  placeholder,
  ...props
}: FormAutocompleteProps<T>) => {
  const formId = id ?? name;

  return (
    <FieldGroup>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={formId}>{label}</FieldLabel>
            <Autocomplete options={options} {...field} />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
    </FieldGroup>
  );
};

export default FormAutocomplete;
