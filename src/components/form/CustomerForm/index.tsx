import { FormTypes } from "@/types/form";
import type { FC } from "react";
import { CustomerValues } from "./validation";
import { CardContent } from "@/components/ui/card";
import FormSelect from "@/components/common/form/select";
import { CustomerType } from "@/types/customer";
import FormInput from "@/components/common/form/input";
import { Button } from "@/components/ui/button";

const CustomerForm: FC<FormTypes<CustomerValues>> = ({
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
            <FormSelect
              control={control}
              name="type"
              label="Type"
              placeholder="Select Type"
              options={Object.values(CustomerType).map((type) => ({
                label: type,
                value: type,
              }))}
            />

            <FormInput
              control={control}
              name="name"
              label="Customer Name"
              placeholder="Enter customer name"
            />
            <FormInput
              control={control}
              name="email"
              label="Email"
              placeholder="Enter customer email"
            />

            <FormInput
              control={control}
              name="phone"
              label="Phone"
              placeholder="Enter customer phone"
            />
            <FormInput
              control={control}
              name="location"
              label="Location"
              placeholder="Enter customer location"
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

export default CustomerForm;
