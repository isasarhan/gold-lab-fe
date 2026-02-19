"use client";
import React, { FC } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { addInvoice } from "@/network/external/invoices";
import { ICustomer } from "@/types/customer";
import { Karat } from "@/types/invoice";
import {
  createOrderSchema,
  OrderValues,
} from "@/components/form/InvoiceForm/validation";
import InvoiceForm from "@/components/form/InvoiceForm";

interface AddInvoiceModuleProps {
  customers: ICustomer[];
}

const AddInvoiceModule: FC<AddInvoiceModuleProps> = ({ customers }) => {
  const orderForm = useForm({
    resolver: zodResolver(createOrderSchema()),
    defaultValues: {
      karat: Karat.K18,
      perItem: 0,
      quantity: 1,
      weight: 0,
    },
  });

  const handleError = (e: any) => {
    console.error("error---------", e);
    toast.error("Missing or Invalid fields!");
  };

  const handleSave = async (orders: OrderValues[]) => {
    try {
      await addInvoice({
        orders,
        invoiceNb: orders[0].invoiceNb,
        customer: orders[0].customer,
        date: orders[0].date,
      }).then(() => {
        toast.success("Invoice added successfully!");
      });
    } catch (e: any) {
      toast.error(e.message);
    }
  };

  return (
    <>
      <InvoiceForm
        form={orderForm}
        customers={customers}
        onSubmit={handleSave}
        onError={handleError}
      />
    </>
  );
};

export default AddInvoiceModule;
