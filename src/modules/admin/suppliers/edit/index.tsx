"use client";
import { ISupplier } from "@/types/supplier";
import React, { FC } from "react";
import { Card, CardDescription, CardHeader } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useUserContext } from "@/providers/UserProvider";
import useSuppliers from "@/services/supplier";
import { zodResolver } from "@hookform/resolvers/zod";
import { createSupplierSchema } from "@/components/form/SupplierForm/validation";
import SupplierForm from "@/components/form/SupplierForm";

export interface EditSupplierModuleProps {
  supplier: ISupplier;
}
const EditSupplierModule: FC<EditSupplierModuleProps> = ({ supplier }) => {
  const { token } = useUserContext();
  const { update } = useSuppliers({ token });

  const supplierForm = useForm({
    mode: "onBlur",
    resolver: zodResolver(createSupplierSchema()),
    defaultValues: {
      ...supplier,
    },
  });

  const handleError = (e: any) => {
    console.error("error---------", e);
    toast.error("Missing or Invalid fields!");
  };

  const handleSubmit = async (data: any) => {
    try {
      const { name, phone, weight, cash, silver, description } = data;
      await update(supplier._id!, {
        name,
        phone,
        weight,
        cash,
        silver,
        description,
      });
      toast.success("Supplier updated successfully!");
    } catch (e: any) {
      toast.error(e.message);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardDescription>
          Fill in the details to create a new supplier
        </CardDescription>
      </CardHeader>
      <SupplierForm
        form={supplierForm}
        onSubmit={handleSubmit}
        onError={handleError}
      />
    </Card>
  );
};

export default EditSupplierModule;
