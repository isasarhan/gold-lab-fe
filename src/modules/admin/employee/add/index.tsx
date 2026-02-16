"use client";
import React, { FC } from "react";

import { Card, CardDescription, CardHeader } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { useUserContext } from "@/providers/UserProvider";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import useEmployees from "@/services/employees";
import EmployeeForm from "@/components/form/EmployeeForm";
import {
  createEmployeeSchema,
  EmployeeValues,
} from "@/components/form/EmployeeForm/validation";

export interface AddEmployeeModuleProps {}
const AddEmployeeModule: FC<AddEmployeeModuleProps> = () => {
  const { token } = useUserContext();
  const { add } = useEmployees({ token });

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
      await add(data);
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
