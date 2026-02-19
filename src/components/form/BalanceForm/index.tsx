import { FormTypes } from "@/types/form";
import type { FC } from "react";
import { BalanceValues } from "./validation";
import { CardContent } from "@/components/ui/card";
import FormInput from "@/components/common/form/input";
import { Button } from "@/components/ui/button";

const BalanceForm: FC<FormTypes<BalanceValues>> = ({
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
          <div className="flex flex-col gap-4 ">
            <FormInput
              control={control}
              name="gold"
              label="Gold"
              placeholder="Enter balance gold"
            />
            <FormInput
              control={control}
              name="cash"
              label="Cash"
              placeholder="Enter balance cash"
            />

            <Button type="submit" className="w-full" loading={isLoading}>
              Update
            </Button>
          </div>
        </CardContent>
      </form>
    </>
  );
};

export default BalanceForm;
