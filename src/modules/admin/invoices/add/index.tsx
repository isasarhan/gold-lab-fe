"use client";
import React, { FC, useState } from "react";

import { Card } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { useUserContext } from "@/providers/UserProvider";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import FormInput from "@/components/common/form/input";
import FormSelect from "@/components/common/form/select";
import useInvoices from "@/services/invoices";
import { AddInvoiceSchema, AddOrderSchema } from "../validation";
import { ICustomer } from "@/types/customer";
import FormDate from "@/components/common/form/date";
import { IOrder, ItemType, Karat } from "@/types/invoice";
import FormTextArea from "@/components/common/form/textarea";
import OrderTable from "../components/order-table";
import ConfirmDialog from "../../../../components/common/discard-dialog";
import FormAutocomplete from "@/components/common/form/autocomplete";
import { or } from "ramda";
import { parseInvoiceKarat } from "@/lib/parseKarat";
import {
  createOrderSchema,
  OrderValues,
} from "@/components/form/InvoiceForm/validation";
import InvoiceForm from "@/components/form/InvoiceForm";

interface AddInvoiceModuleProps {
  customers: ICustomer[];
}

const AddInvoiceModule: FC<AddInvoiceModuleProps> = ({ customers }) => {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const { token } = useUserContext();
  const { add } = useInvoices({ token });

  const orderForm = useForm({
    mode: "onBlur",
    resolver: zodResolver(createOrderSchema()),
    defaultValues: {
      karat: Karat.K18,
      perItem: 0,
      quantity: 1,
      weight: 0,
    },
  });

  const handleSave = async () => {
    try {
      await add({
        orders,
        invoiceNb: orders[0].invoiceNb,
        customer: orders[0].customer,
        date: orders[0].date,
      }).then(() => {
        toast.success("Invoice added successfully!");
        handleDiscardInvoice();
      });
    } catch (e: any) {
      toast.error(e.message);
    }
  };
  const handleSubmit = async (data: OrderValues) => {
    orderForm.setValue("weight", 0);
    setOrders((prev) => [...prev, data]);
  };
  const handleEditOrder = (order: IOrder, index: number) => {
    setOrders((prevOrders) => prevOrders.filter((_, i) => i !== index));
    orderForm.reset(order);
  };
  const handleDeleteOrder = (index: number) => {
    setOrders((prevOrders) => prevOrders.filter((_, i) => i !== index));
  };
  const getTotals = () => {
    return orders.reduce(
      (total, order) => {
        return {
          gold:
            total.gold + (order.weight * parseInvoiceKarat(order.karat!)) / 995,
          cash:
            total.cash +
            (order.weight * order.perGram + order.quantity * order.perItem),
        };
      },
      { gold: 0, cash: 0 },
    );
  };
  const handleDiscardInvoice = () => {
    setOrders([]);
    orderForm.reset({
      karat: Karat.K18,
    });
  };
  return (
    <>
      <InvoiceForm
        form={orderForm}
        customers={customers}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default AddInvoiceModule;
