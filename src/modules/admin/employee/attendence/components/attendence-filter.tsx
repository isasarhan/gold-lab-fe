"use client";
import FormSelect from "@/components/common/form/select";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { MonthEnum, months, years } from "@/lib/dates";
import { IEmployee } from "@/types/employee";
import { usePathname, useRouter } from "next/navigation";
import React, { FC } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export interface AttendenceFiltersProps {
  employees: IEmployee[];
}

interface Filter {
  employee: string;
  month?: number;
  year?: number;
}

const AttendenceFilters: FC<AttendenceFiltersProps> = ({ employees }) => {
  const pathName = usePathname();
  const router = useRouter();
  const form = useForm<Filter>({
    mode: "onBlur",
    defaultValues: {
      month: new Date().getMonth(),
      year: new Date().getFullYear(),
    },
  });
  const { handleSubmit } = form;

  const onSubmit = async (data: Filter) => {
    if (!data.employee) {
      toast.error("choose a employee");
      return;
    }
    const params = new URLSearchParams();
    if (data.employee) params.append("employee", data.employee);
    if (data.month) params.append("month", data.month.toString());
    if (data.year) params.append("year", data.year.toString());

    router.push(`${pathName}?${params.toString()}`);
  };

  return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-center gap-3 pe-8">
          <FormSelect
            control={form.control}
            name="employee"
            label="Employee"
            placeholder="Select employee"
            options={employees.map((employee) => ({
              key: employee._id,
              value: employee._id!,
              label: employee.name,
            }))}
          />
          <FormSelect
            control={form.control}
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

          <FormSelect
            control={form.control}
            name="month"
            label="Month"
            placeholder="Select Type"
            defaultValue={months[new Date().getMonth()]}
            options={Object.values(MonthEnum).map((month) => ({
              label: month,
              value: month,
            }))}
          />

          <Button className="mt-3" type="submit">
            View Attendence
          </Button>
        </div>
      </form>
  );
};

export default AttendenceFilters;
