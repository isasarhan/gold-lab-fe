"use client";
import { useUserContext } from "@/providers/UserProvider";
import useReceipts from "@/services/receipts";
import { ICustomer } from "@/types/customer";
import React, { FC } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import ReceiptForm from "@/components/form/ReceiptForm";
import {
  createReceiptSchema,
  ReceiptValues,
} from "@/components/form/ReceiptForm/validation";

export interface AddReceiptModuleProps {
  customers: ICustomer[];
}

const AddReceiptModule: FC<AddReceiptModuleProps> = ({ customers }) => {
  const { token } = useUserContext();
  const { addMany } = useReceipts({ token });

  const receiptForm = useForm({
    mode: "onBlur",
    resolver: zodResolver(createReceiptSchema()),
    defaultValues: {
      karat: 995,
      weight: 0,
      cash: 0,
    },
  });

  const handleError = (e: any) => {
    console.error("error---------", e);
    toast.error("Missing or Invalid fields!");
  };

  const handleSave = async (receipts: ReceiptValues[]) => {
    try {
      await addMany(receipts).then(() => {
        toast.success("Payments added successfully!");
      });
    } catch (e: any) {
      toast.error(e.message);
    }
  };

  return (
    <>
      <ReceiptForm
        form={receiptForm}
        customers={customers}
        onSubmit={handleSave}
        onError={handleError}
      />
    </>
  );
};

export default AddReceiptModule;
