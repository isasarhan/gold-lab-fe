"use client";
import React, { FC } from "react";
import { Card, CardDescription, CardHeader } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { useUserContext } from "@/providers/UserProvider";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import useCustomers from "@/services/customers";
import CustomerForm from "@/components/form/CustomerForm";
import {
  createCustomerSchema,
  CustomerValues,
} from "@/components/form/CustomerForm/validation";

export interface AddCustomerModuleProps {}
const AddCustomerModule: FC<AddCustomerModuleProps> = () => {
  const { token } = useUserContext();
  const { add } = useCustomers({ token });

  const customerForm = useForm({
    mode: "onBlur",
    resolver: zodResolver(createCustomerSchema()),
  });

  const handleError = (e: any) => {
    console.error("error---------", e);
    toast.error("Missing or Invalid fields!");
  };

  const handleSubmit = async (data: CustomerValues) => {
    try {
      await add(data);
      toast.success("Customer added successfully!");
    } catch (e: any) {
      toast.error(e.message);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardDescription>
          Fill in the details to create a new customer
        </CardDescription>
      </CardHeader>
      <CustomerForm
        form={customerForm}
        onSubmit={handleSubmit}
        onError={handleError}
      />
    </Card>
  );
};

export default AddCustomerModule;
