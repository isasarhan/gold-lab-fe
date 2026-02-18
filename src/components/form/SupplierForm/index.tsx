import { type FC } from "react";
import { SupplierValues } from "./validation";
import { CardContent } from "@/components/ui/card";
import FormInput from "@/components/common/form/input";
import { Button } from "@/components/ui/button";
import FormTextArea from "@/components/common/form/textarea";
import { FormTypes } from "@/types/form";

const SupplierForm: FC<FormTypes<SupplierValues>> = ({
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
          <div className="flex flex-col gap-3 ">
            <div className="flex items-start gap-3 flex-col lg:flex-row">
              <FormInput
                control={control}
                name="name"
                label="Full Name"
                placeholder="Enter supplier name"
              />

              <FormInput
                control={control}
                name="phone"
                label="Phone"
                placeholder="Enter supplier phone"
              />
            </div>
            <FormInput
              control={control}
              name="weight"
              label="Gold"
              placeholder="Enter supplier gold balance"
            />
            <FormInput
              control={control}
              name="cash"
              label="Cash"
              placeholder="Enter supplier cash balance"
            />
            <FormInput
              control={control}
              name="silver"
              label="Silver"
              placeholder="Enter supplier silver balance"
            />
            <FormTextArea
              control={control}
              name="description"
              label="Description"
              placeholder="Enter description"
            />
          </div>
          <Button type="submit" className="w-full" loading={isLoading}>
            Add
          </Button>
        </CardContent>
      </form>
    </>
  );
};

export default SupplierForm;
