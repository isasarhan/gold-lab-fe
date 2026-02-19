import { FormTypes } from "@/types/form";
import type { FC } from "react";
import { CardContent } from "@/components/ui/card";
import FormInput from "@/components/common/form/input";
import { Button } from "@/components/ui/button";
import { EmployeeValues } from "./validation";

const EmployeeForm: FC<FormTypes<EmployeeValues>> = ({
  form,
  onSubmit,
  onError,
  isLoading,
}) => {
  const { control, handleSubmit } = form;
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <CardContent className="space-y-3">
          <div className="flex flex-col gap-3">
            <div className="flex gap-3 w-1/2 ">
              <FormInput
                className=""
                control={control}
                name="name"
                label="Full Name"
                placeholder="Enter employee name"
              />
            </div>
            <div className="flex gap-3">
              <FormInput
                control={control}
                name="email"
                label="Email"
                placeholder="Enter employee email"
              />

              <FormInput
                control={control}
                name="phone"
                label="Phone"
                placeholder="Enter employee phone"
              />
            </div>
            <div className="flex gap-3">
              <FormInput
                control={control}
                name="position"
                label="Position"
                placeholder="Enter employee position"
              />
              <FormInput
                control={control}
                name="salary"
                label="Salary"
                placeholder="Enter employee salary"
              />
            </div>
          </div>
          <Button type="submit" className="w-full" loading={isLoading}>
            Add
          </Button>
        </CardContent>
      </form>
    </>
  );
};

export default EmployeeForm;
