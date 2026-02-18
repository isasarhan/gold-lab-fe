import { FormTypes } from "@/types/form";
import type { FC } from "react";
import { CardContent } from "@/components/ui/card";
import FormInput from "@/components/common/form/input";
import { Button } from "@/components/ui/button";
import { SalaryPaymentValues } from "./validation";
import { IEmployee } from "@/types/employee";
import FormAutocomplete from "@/components/common/form/autocomplete";
import FormDate from "@/components/common/form/date";
import FormSelect from "@/components/common/form/select";
import { MonthEnum, months, years } from "@/lib/dates";
import { PaymentTypeEnum } from "@/types/salary-payment";
import FormTextArea from "@/components/common/form/textarea";

interface SalaryPaymentFormProps extends FormTypes<SalaryPaymentValues> {
  employees: IEmployee[];
}

const SalaryPaymentForm: FC<SalaryPaymentFormProps> = ({
  form,
  employees,
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
            <div className="flex gap-3">
              <FormAutocomplete
                control={control}
                name="employee"
                title="Employeer"
                placeholder="Select employee"
                options={employees.map((customer) => ({
                  key: customer._id,
                  value: customer._id!,
                  label: customer.name,
                }))}
              />
              <FormDate
                control={control}
                name="date"
                defaultValue={new Date()}
                label="Date"
                placeholder="Pick a date"
              />
            </div>
            <div className="flex gap-3">
              <div className="flex-1">
                <FormSelect
                  control={control}
                  name="year"
                  label="Year"
                  defaultValue={new Date().getFullYear().toString()}
                  placeholder="Select year"
                  options={years.map((year) => ({
                    key: `${year}`,
                    value: `${year}`,
                    label: `${year}`,
                  }))}
                />
              </div>
              <div className="flex-1">
                <FormSelect
                  control={control}
                  name="month"
                  label="Month"
                  defaultValue={months[new Date().getMonth()]}
                  placeholder="Select Month"
                  options={Object.values(MonthEnum).map((month) => ({
                    label: month,
                    value: month,
                  }))}
                />
              </div>
            </div>
            <div className="flex gap-3">
              <FormInput
                control={control}
                name="amount"
                label="Amount"
                placeholder="Enter payment amount"
              />
              <FormSelect
                control={control}
                name="type"
                label="Payment Type"
                placeholder="Select Type"
                options={Object.values(PaymentTypeEnum).map((month) => ({
                  label: month,
                  value: month,
                }))}
              />
            </div>
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

export default SalaryPaymentForm;
