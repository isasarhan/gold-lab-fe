"use client";
import { Card, CardDescription, CardHeader } from "@/components/ui/card";

import { ICustomer } from "@/types/customer";
import React, { FC } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import CustomerForm from "@/components/form/CustomerForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { createCustomerSchema } from "@/components/form/CustomerForm/validation";
import { updateCustomer } from "@/network/external/customers";

export interface EditCustomerModuleProps {
  customer: ICustomer;
}

const EditCustomerModule: FC<EditCustomerModuleProps> = ({ customer }) => {
  const customerForm = useForm({
    mode: "onBlur",
    resolver: zodResolver(createCustomerSchema()),
    defaultValues: {
      ...customer,
    },
  });

  const handleError = (e: any) => {
    console.error("error---------", e);
    toast.error("Missing or Invalid fields!");
  };

  const handleSubmit = async (data: any) => {
    try {
      const { email, phone, name, type, location } = data;
      await updateCustomer(customer._id!, {
        email,
        phone,
        name,
        type,
        location,
      });
      toast.success("Customer info updated successfully!");
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

export default EditCustomerModule;
