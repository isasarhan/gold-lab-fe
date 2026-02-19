import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

export interface FormTextAreaProps<
  T extends FieldValues,
> extends React.ComponentProps<"textarea"> {
  id?: string;
  label: string;
  control: Control<T>;
  name: Path<T>;
  placeholder: string;
}
const FormTextArea = <T extends FieldValues>({
  id,
  label,
  control,
  name,
  placeholder,
  ...props
}: FormTextAreaProps<T>) => {
  const formId = id ?? name;

  return (
    <FieldGroup>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={formId}>{label}</FieldLabel>
            <Textarea
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

export default FormTextArea;
