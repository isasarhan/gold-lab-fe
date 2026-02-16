import type { FieldValues, UseFormReturn } from "react-hook-form";

export interface FormTypes<T extends FieldValues> {
  isLoading?: boolean;
  hiddenInputs?: string[];
  onSearch?: (search: string, param: string) => void;
  form: UseFormReturn<T>;
  onSubmit: (data: T) => void | Promise<void>;
  onError?: (error: any) => void;
}
