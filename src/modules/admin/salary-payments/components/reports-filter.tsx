"use client";
import React, { FC } from "react";
import FormSelect from "@/components/common/form/select";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { usePathname, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { MonthEnum, months, years } from "@/lib/dates";

export interface ReportsFilterProps {}
interface Filter {
  year: string;
  month: string;
}
const ReportsFilter: FC<ReportsFilterProps> = () => {
  const pathName = usePathname();
  const router = useRouter();
  const form = useForm<Filter>({
    mode: "onBlur",
    defaultValues: {
      month: months[new Date().getMonth()],
      year: new Date().getFullYear().toString(),
    },
  });
  const { handleSubmit } = form;

  const onSubmit = async (data: Filter) => {
    const params = new URLSearchParams();
    if (data.month && data.year) {
      params.append("year", data.year);
      params.append("month", data.month);
    } else {
      toast.error("choose a year and month!");
      return;
    }
    router.push(`${pathName}?${params.toString()}`);
  };

  return (
    <Card className="p-5">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-3 w-full md:flex-row">
          <div className="flex-1">
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
          </div>
          <div className="flex-1">
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
          </div>
          <div className="flex-1 flex flex-col justify-end">
            <Button type="submit">View</Button>
          </div>
        </div>
      </form>
    </Card>
  );
};

export default ReportsFilter;
