"use client";
import React, { FC } from "react";

import { Card, CardDescription, CardHeader } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { IEmployee } from "@/types/employee";
import { months } from "@/lib/dates";
import { addSalaryPayment } from "@/network/external/salary-payment";
import {
  createSalaryPaymentSchema,
  SalaryPaymentValues,
} from "@/components/form/SalaryPaymentForm/validation";
import SalaryPaymentForm from "@/components/form/SalaryPaymentForm";

export interface AddSalaryPaymentModuleProps {
  employees: IEmployee[];
}
const AddSalaryPaymentModule: FC<AddSalaryPaymentModuleProps> = ({
  employees,
}) => {
  const salaryPaymentForm = useForm({
    resolver: zodResolver(createSalaryPaymentSchema()),
    defaultValues: {
      month: months[new Date().getMonth()],
      year: new Date().getFullYear().toString(),
    },
  });

  const handleError = (e: any) => {
    console.error("error---------", e);
    toast.error("Missing or Invalid fields!");
  };

  const onSubmit = async (data: SalaryPaymentValues) => {
    try {
      await addSalaryPayment(data);
      toast.success("salary payment added successfully!");
    } catch (e: any) {
      toast.error(e.message);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardDescription>
          Fill in the details to create a new employee payment
        </CardDescription>
      </CardHeader>
      <SalaryPaymentForm
        form={salaryPaymentForm}
        onSubmit={onSubmit}
        onError={handleError}
        employees={employees}
      />
    </Card>
  );
};

export default AddSalaryPaymentModule;
