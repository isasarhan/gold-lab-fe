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

interface AddInvoiceModuleProps {
    customers: ICustomer[]
}

const AddInvoiceModule: FC<AddInvoiceModuleProps> = ({ customers }) => {
    const [orders, setOrders] = useState<IOrder[]>([])
    const { token } = useUserContext();
    const { add } = useInvoices({ token })

    const form = useForm({
        mode: "onBlur",
        resolver: zodResolver(AddOrderSchema),
        defaultValues: {
            karat: Karat.K18
        }
    });
    const { handleSubmit, watch } = form;

    type InvoiceDate = z.infer<typeof AddOrderSchema>;

    const handleSave = async () => {
        try {
            await add({
                orders,
                invoiceNb: orders[0].invoiceNb,
                customer: orders[0].customer,
                date: orders[0].date,
            }).then(() => {
                toast.success("Invoice added successfully!");
                handleDiscardInvoice()
            })

        } catch (e: any) {
            toast.error(e.message);
        }
    }
    const onSubmit = async (data: InvoiceDate) => {
        form.reset({
            customer: data.customer,
            date: data.date,
            invoiceNb: data.invoiceNb,
            karat: Karat.K18,
            perItem: 0,
            quantity: 1,
        })
        setOrders(prev => [...prev, data])
    };
    const handleEditOrder = (order: IOrder, index: number) => {
        setOrders(prevOrders => prevOrders.filter((_, i) => i !== index));
        form.reset(order)
    };
    const handleDeleteOrder = (index: number) => {
        setOrders(prevOrders => prevOrders.filter((_, i) => i !== index));
    };
    const handleDiscardInvoice = () => {
        setOrders([]);
        form.reset({
            karat: Karat.K18
        })
    };
    const getTotals = () => {
        return orders.reduce((total, order) => {
            return {
                gold: total.gold + (order.weight * parseInvoiceKarat(order.karat!) / 995),
                cash: total.cash + (order.weight * order.perGram + order.quantity * order.perItem)
            }
        }, { gold: 0, cash: 0 })
    }
    return (
        <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                <Card className="p-5">
                    <div className="flex gap-3 flex-col lg:flex-row ">
                        <div className="flex items-start lg:w-1/3">
                            <FormAutocomplete
                                control={form.control}
                                name="customer"
                                title="Customer"
                                placeholder="Select customer"
                                options={customers.map((customer) => ({
                                    key: customer._id,
                                    value: customer._id!,
                                    label: customer.name,
                                }))}
                            />
                        </div>
                        <div className="flex lg:w-1/3 ">
                            <FormInput
                                control={form.control}
                                name="invoiceNb"
                                title='Invoice #'
                                placeholder="Enter invoice #"
                            />
                        </div>
                        <div className="flex lg:w-1/3">
                            <FormDate
                                control={form.control}
                                name="date"
                                title="Date"
                                defaultValue={new Date()}
                                placeholder="Pick a date"
                            />
                        </div>
                    </div>
                </Card>
                <Card className="p-5">
                    <div className="flex gap-3 flex-col lg:flex-row">
                        <div className="flex lg:w-1/3">
                            <FormSelect
                                control={form.control}
                                name="type"
                                title='Type'
                                placeholder="Select Type"
                                options={Object.values(ItemType).map((type) => ({
                                    label: type,
                                    value: type
                                }))}
                            />
                        </div>
                        <div className="flex lg:w-1/3">
                            <FormInput
                                control={form.control}
                                name="quantity"
                                title='Quantity'
                                placeholder="Enter quantity"
                            />
                        </div>
                        <div className="flex lg:w-1/3">
                            <FormSelect
                                control={form.control}
                                name="karat"
                                title='Karat'
                                defaultValue={watch('karat')}
                                placeholder="Select Type"
                                options={Object.values(Karat).map((karat) => ({
                                    label: karat,
                                    value: karat
                                }))}
                            />
                        </div>
                    </div>
                    <div className="flex gap-3 flex-col lg:flex-row">
                        <div className="flex lg:w-1/3">
                            <FormInput
                                control={form.control}
                                name="weight"
                                title='Weight'
                                placeholder="Enter quantity"
                            />
                        </div>
                        <div className="flex lg:w-1/3">
                            <FormInput
                                control={form.control}
                                name="perGram"
                                title='Per Gram'
                                placeholder="Enter price per weight"
                            />
                        </div>
                        <div className="flex lg:w-1/3">
                            <FormInput
                                control={form.control}
                                name="perItem"
                                title='Per Item'
                                placeholder="Enter price per Item"
                            />
                        </div>
                    </div>
                    <FormTextArea
                        control={form.control}
                        name="description"
                        title='Description'
                        placeholder="Enter description"
                    />

                    <div className="flex justify-between flex-col lg:flex-row">
                        <div className="mb-3 lg:mb-0">
                            <Button variant={'secondary'} type="submit">Add</Button>
                        </div>
                        <div className="flex gap-3">
                            <ConfirmDialog
                                onConfirm={handleDiscardInvoice}
                                text="Discard Invoice"
                                title="Discard Invoice"
                                description="Are you sure you want to discard invoice?">
                                <Button type="button" variant={'destructive'}>Discard Invoice</Button>
                            </ConfirmDialog>
                            <Button type="button" onClick={handleSave}>Save Invoice</Button>
                        </div>
                    </div>
                </Card>
                <Card className="flex lg:gap-10 lg:flex-row px-3 justify-center ">
                    <div className="flex items-center gap-5 justify-center text-center">
                        <span className="font-semibold">Total Weight:</span>
                        <span>{getTotals().gold.toFixed(2)} gr</span>
                    </div>
                    <div className="flex items-center gap-5 justify-center text-center">
                        <span className="font-semibold">Total Cash:</span>
                        <span>{getTotals().cash.toFixed(2)} $</span>
                    </div>
                </Card>
                <OrderTable orders={orders} onDelete={handleDeleteOrder} onEdit={handleEditOrder} />
            </form>
        </Form>
    );
}

export default AddInvoiceModule;
