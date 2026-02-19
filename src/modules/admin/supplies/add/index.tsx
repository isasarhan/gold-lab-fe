"use client";
import React, { FC } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { ISupplier } from "@/types/supplier";
import { addSupplyBulk } from "@/network/external/supplies";
import { Karat } from "@/types/invoice";
import SupplyForm from "@/components/form/SupplyForm";
import {
  createSupplySchema,
  SupplyValues,
} from "@/components/form/SupplyForm/validation";

export interface AddSupplyModuleProps {
  suppliers: ISupplier[];
}

const AddSupplyModule: FC<AddSupplyModuleProps> = ({ suppliers }) => {
  const supplyForm = useForm({
    mode: "onBlur",
    resolver: zodResolver(createSupplySchema()),
    defaultValues: {
      karat: Karat.K18,
    },
  });

  const handleError = (e: any) => {
    console.error("error---------", e);
    toast.error("Missing or Invalid fields!");
  };

  const handleSave = async (supplies: SupplyValues[]) => {
    try {
      await addSupplyBulk(supplies).then(() => {
        toast.success("Supplies added successfully!");
      });
    } catch (e: any) {
      toast.error(e.message);
    }
  };

  return (
    <>
      <SupplyForm
        suppliers={suppliers}
        form={supplyForm}
        onSubmit={handleSave}
        onError={handleError}
      />
    </>
  );
};

export default AddSupplyModule;
