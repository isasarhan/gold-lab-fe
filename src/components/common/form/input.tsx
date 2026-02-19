import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

export interface FormInputProps<
  T extends FieldValues,
> extends React.ComponentProps<"input"> {
  id?: string;
  label: string;
  control: Control<T>;
  name: Path<T>;
  placeholder: string;
  className?: string;
}

const FormInput = <T extends FieldValues>({
  id,
  label,
  control,
  name,
  className,
  placeholder,
  ...props
}: FormInputProps<T>) => {
  const formId = id ?? name;

  return (
    <FieldGroup>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={formId}>{label}</FieldLabel>
            <Input
              {...field}
              id={formId}
              {...props}
              aria-invalid={fieldState.invalid}
              placeholder={placeholder}
              autoComplete="off"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
    </FieldGroup>
  );
};

export default FormInput;
