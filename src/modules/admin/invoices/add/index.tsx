"use client";
import React, { FC } from "react";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { useForm } from "react-hook-form";
import {
    Form,
} from "@/components/ui/form";
import { useUserContext } from "@/providers/UserProvider";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import FormInput from "@/components/common/form/input";
import FormSelect from "@/components/common/form/select";
import useInvoices from "@/services/invoices";
import { AddInvoiceSchema } from "../validation";
import { ICustomer } from "@/types/customer";
import FormDate from "@/components/common/form/date";
import { ItemType } from "@/types/invoice";

interface AddInvoiceModuleProps {
    customers: ICustomer[]
}

const AddInvoiceModule: FC<AddInvoiceModuleProps> = ({ customers }) => {
    const { token } = useUserContext();
    const { add } = useInvoices({ token })

    const form = useForm({
        mode: "onBlur",
        resolver: zodResolver(AddInvoiceSchema),
    });
    const { handleSubmit } = form;
    type InvoiceDate = z.infer<typeof AddInvoiceSchema>;

    const onSubmit = async (data: InvoiceDate) => {
        try {
            // await add(data);
            toast.success("Invoice added successfully!");
        } catch (e: any) {
            toast.error(e.message);
        }
    };
    return (
        <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                <Card className="p-5">
                    <div className="flex gap-3">
                        <div className="flex w-1/3">
                            <FormSelect
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
                        <div className="flex w-1/3 ">
                            <FormInput
                                control={form.control}
                                name="invoiceNb"
                                title='Invoice #'
                                placeholder="Enter invoice #"
                            />
                        </div>
                        <div className="flex w-1/3">
                            <FormDate
                                control={form.control}
                                name="date"
                                title="Date"
                                placeholder="Pick a date"
                            />
                        </div>
                    </div>
                </Card>
                <Card className="p-5">
                    <div className="flex gap-3">
                        <div className="flex w-1/3">
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
                        <div className="flex w-1/3">
                            <FormInput
                                control={form.control}
                                name="quantity"
                                title='Quantity'
                                placeholder="Enter quantity"
                            />
                        </div>
                    </div>
                </Card>
                {/* <Button type="submit" className="w-full">
                            Add
                        </Button> */}
            </form>
        </Form>
    );
}

export default AddInvoiceModule;
