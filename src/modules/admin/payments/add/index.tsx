"use client";
import { addSupplyPaymentBulk } from "@/network/external/supply-payments";
import { ISupplier } from "@/types/supplier";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { FC } from "react";
import { useForm } from "react-hook-form";
import { Currency } from "@/types/receipts";
import { toast } from "sonner";
import {
  createSupplyPaymentSchema,
  SupplyPaymentValues,
} from "@/components/form/SupplyPaymentForm/validation";
import SupplyPaymentForm from "@/components/form/SupplyPaymentForm";

export interface AddPaymentModuleProps {
  suppliers: ISupplier[];
}
const AddPaymentModule: FC<AddPaymentModuleProps> = ({ suppliers }) => {
  const supplyPaymentForm = useForm({
    resolver: zodResolver(createSupplyPaymentSchema()),
    defaultValues: {
      currency: Currency.Usd,
      karat: 995,
    },
  });

  const handleError = (e: any) => {
    console.error("error---------", e);
    toast.error("Missing or Invalid fields!");
  };

  const handleSave = async (payments: SupplyPaymentValues[]) => {
    try {
      await addSupplyPaymentBulk(payments).then(() => {
        toast.success("Payments added successfully!");
      });
    } catch (e: any) {
      toast.error(e.message);
    }
  };

  return (
    <>
      <SupplyPaymentForm
        form={supplyPaymentForm}
        onSubmit={handleSave}
        suppliers={suppliers}
        onError={handleError}
      />
    </>
  );
};

export default AddPaymentModule;
