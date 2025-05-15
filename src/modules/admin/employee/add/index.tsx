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
import { AddEmployeeSchema } from "../validation";
import useEmployees from "@/services/employees";

export interface AddEmployeeModuleProps { }
const AddEmployeeModule: FC<AddEmployeeModuleProps> = () => {
    const { token } = useUserContext();
    const { add } = useEmployees({ token })

    const form = useForm({
        mode: "onBlur",
        resolver: zodResolver(AddEmployeeSchema),
    });
    const { handleSubmit } = form;
    type employeeData = z.infer<typeof AddEmployeeSchema>;

    const onSubmit = async (data: employeeData) => {
        try {
            await add(data);
            toast.success("employee added successfully!");
        } catch (e: any) {
            toast.error(e.message);
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardDescription>
                    Fill in the details to create a new employee
                </CardDescription>
            </CardHeader>
            <Form {...form}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <CardContent className="space-y-3">
                        <div className="flex flex-col gap-3">
                            <div className="flex gap-3 w-1/2 ">
                                <FormInput
                                    className=""
                                    control={form.control}
                                    name="name"
                                    title='Full Name'
                                    placeholder="Enter employee name"
                                />
                            </div>
                            <div className="flex gap-3">

                                <FormInput
                                    control={form.control}
                                    name="email"
                                    title='Email'
                                    placeholder="Enter employee email"
                                />

                                <FormInput
                                    control={form.control}
                                    name="phone"
                                    title='Phone'
                                    placeholder="Enter employee phone"
                                />
                            </div>
                            <div className="flex gap-3">
                                <FormInput
                                    control={form.control}
                                    name="position"
                                    title='Position'
                                    placeholder="Enter employee position"
                                />
                                <FormInput
                                    control={form.control}
                                    name="salary"
                                    title='Salary'
                                    placeholder="Enter employee salary"
                                />
                            </div>
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

export default AddEmployeeModule;

