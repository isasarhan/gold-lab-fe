"use client";
import React, { FC } from "react";

import { Card, CardDescription, CardHeader } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import EmployeeForm from "@/components/form/EmployeeForm";
import {
  createEmployeeSchema,
  EmployeeValues,
} from "@/components/form/EmployeeForm/validation";
import { addEmployee } from "@/network/external/employees";

export interface AddEmployeeModuleProps {}
const AddEmployeeModule: FC<AddEmployeeModuleProps> = () => {
  const employeeForm = useForm({
    mode: "onBlur",
    resolver: zodResolver(createEmployeeSchema()),
  });

  const handleError = (e: any) => {
    console.error("error---------", e);
    toast.error("Missing or Invalid fields!");
  };

  const handleSubmit = async (data: EmployeeValues) => {
    try {
      await addEmployee(data);
      toast.success("employee added successfully!");
    } catch (e: any) {
      toast.error(e.message);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardDescription>
          Fill in the details to create a new employee
        </CardDescription>
      </CardHeader>
      <EmployeeForm
        form={employeeForm}
        onSubmit={handleSubmit}
        onError={handleError}
      />
    </Card>
  );
};

export default AddEmployeeModule;
