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
import useEmployees from "@/services/employees";
import { IEmployee } from "@/types/employee";
import FormAutocomplete from "@/components/common/form/autocomplete";
import { MonthEnum, months, years } from "@/lib/dates";
import { PaymentTypeEnum } from "@/types/salary-payment";
import FormTextArea from "@/components/common/form/textarea";
import FormDate from "@/components/common/form/date";
import useSalaryPayments from "@/services/salary-payment";
import { AddSalaryPayment } from "../validation";

export interface AddSalaryPaymentModuleProps {
    employees: IEmployee[]
}
const AddSalaryPaymentModule: FC<AddSalaryPaymentModuleProps> = ({ employees }) => {
    const { token } = useUserContext();
    const { add } = useSalaryPayments({ token })

    const form = useForm({
        mode: "onBlur",
        resolver: zodResolver(AddSalaryPayment),
        defaultValues:{
            month:months[new Date().getMonth()],
            year:new Date().getFullYear().toString()
        }
    });
    const { handleSubmit } = form;

    type paymentData = z.infer<typeof AddSalaryPayment>;

    const onSubmit = async (data: paymentData) => {
        try {
            await add(data);
            toast.success("salary payment added successfully!");
        } catch (e: any) {
            toast.error(e.message);
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardDescription>
                    Fill in the details to create a new employee payment
                </CardDescription>
            </CardHeader>
            <Form {...form}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <CardContent className="space-y-3">
                        <div className="flex flex-col gap-3">
                            <div className="flex gap-3">
                                <FormAutocomplete
                                    control={form.control}
                                    name="employee"
                                    title="Employeer"
                                    placeholder="Select employee"
                                    options={employees.map((customer) => ({
                                        key: customer._id,
                                        value: customer._id!,
                                        label: customer.name,
                                    }))}
                                />
                                <FormDate
                                    control={form.control}
                                    name="date"
                                    defaultValue={new Date()}
                                    title="Date"
                                    placeholder="Pick a date"
                                />
                            </div>
                            <div className="flex gap-3">

                                <div className="flex-1">
                                    <FormSelect
                                        control={form.control}
                                        name="year"
                                        title="Year"
                                        defaultValue={new Date().getFullYear().toString()}
                                        placeholder="Select year"
                                        options={years.map((year) => ({
                                            key: `${year}`,
                                            value: `${year}`,
                                            label: `${year}`,
                                        }))}
                                    />
                                </div>
                                <div className="flex-1">
                                    <FormSelect
                                        control={form.control}
                                        name="month"
                                        title='Month'
                                        defaultValue={months[new Date().getMonth()]}
                                        placeholder="Select Month"
                                        options={Object.values(MonthEnum).map((month) => ({
                                            label: month,
                                            value: month
                                        }))}
                                    />
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <FormInput
                                    control={form.control}
                                    name="amount"
                                    title='Amount'
                                    placeholder="Enter payment amount"
                                />
                                <FormSelect
                                    control={form.control}
                                    name="type"
                                    title='Payment Type'
                                    placeholder="Select Type"
                                    options={Object.values(PaymentTypeEnum).map((month) => ({
                                        label: month,
                                        value: month
                                    }))}
                                />
                            </div>
                            <FormTextArea
                                control={form.control}
                                name="description"
                                title='Description'
                                placeholder="Enter description"
                            />
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


export default AddSalaryPaymentModule;