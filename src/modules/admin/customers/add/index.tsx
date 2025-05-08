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
import { AddCustomerSchema } from "../validation";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import FormInput from "@/components/common/form/input";
import FormSelect from "@/components/common/form/select";
import { CustomerType } from "@/types/customer";
import useCustomers from "@/services/customers";

export interface AddCustomerModuleProps { }
const AddCustomerModule: FC<AddCustomerModuleProps> = () => {
    const { token } = useUserContext();
    const { add } = useCustomers({ token })

    const form = useForm({
        mode: "onBlur",
        resolver: zodResolver(AddCustomerSchema),
    });
    const { handleSubmit } = form;
    type CustomerData = z.infer<typeof AddCustomerSchema>;

    const onSubmit = async (data: CustomerData) => {
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
                <CardTitle className="text-2xl font-bold">Add Customer</CardTitle>
                <CardDescription>
                    Fill in the details to create a new customer
                </CardDescription>
            </CardHeader>
            <Form {...form}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <CardContent className="space-y-3">
                        <div className="flex flex-col gap-4 ">
                            <FormSelect
                                control={form.control}
                                name="type"
                                title='Type'
                                placeholder="Select Type"
                                options={Object.values(CustomerType).map((type) => ({
                                    label: type,
                                    value: type
                                }))}
                            />

                            <FormInput
                                control={form.control}
                                name="name"
                                title='Customer Name'
                                placeholder="Enter customer name"
                            />
                            <FormInput
                                control={form.control}
                                name="email"
                                title='Email'
                                placeholder="Enter customer email"
                            />

                            <FormInput
                                control={form.control}
                                name="phone"
                                title='Phone'
                                placeholder="Enter customer phone"
                            />
                            <FormInput
                                control={form.control}
                                name="location"
                                title='Location'
                                placeholder="Enter customer location"
                            />
                        </div>
                        <div className="flex flex-col lg:flex-row items-center w-full gap-4">



                        </div>
                        <Button type="submit" className="w-full">
                            Add
                        </Button>
                    </CardContent>
                </form>
            </Form>
        </Card>
    );
};

export default AddCustomerModule;
