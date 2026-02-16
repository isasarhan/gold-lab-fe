"use client";
import { useUserContext } from "@/providers/UserProvider";
import useEmployees from "@/services/employees";
import { IEmployee } from "@/types/employee";
import React, { FC } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Card, CardDescription, CardHeader } from "@/components/ui/card";
import EmployeeForm from "@/components/form/EmployeeForm";
import {
  createEmployeeSchema,
  EmployeeValues,
} from "@/components/form/EmployeeForm/validation";

export interface EditEmployeeModuleProps {
  employee: IEmployee;
}

const EditEmployeeModule: FC<EditEmployeeModuleProps> = ({ employee }) => {
  const { token } = useUserContext();
  const { update } = useEmployees({ token });

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
      const { name, phone, position, salary, email } = data;
      await update(employee?._id!, { name, phone, position, salary, email });
      toast.success("Employee updated successfully!");
    } catch (e: any) {
      toast.error(e.message);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardDescription>
          Fill in the details to update a new employee
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

export default EditEmployeeModule;
