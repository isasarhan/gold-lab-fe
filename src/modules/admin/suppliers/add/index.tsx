'use client'
import React, { FC, useEffect } from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
} from "@/components/ui/card";
import { useForm } from "react-hook-form";
import {
    Form,
} from "@/components/ui/form";
import { useUserContext } from "@/providers/UserProvider";
import useSuppliers from '@/services/supplier';
import { zodResolver } from '@hookform/resolvers/zod';
import { AddSupplierSchema } from '../validation';
import * as z from 'zod'
import { toast } from 'sonner';
import FormInput from '@/components/common/form/input';
import { Button } from '@/components/ui/button';
import FormTextArea from '@/components/common/form/textarea';

export interface AddSupplyModuiereProps { }

const AddSupplierModule: FC<AddSupplyModuiereProps> = () => {
    const { token } = useUserContext();
    const { add } = useSuppliers({ token })

    const form = useForm({
        mode: "onBlur",
        resolver: zodResolver(AddSupplierSchema),
    });
    const { handleSubmit } = form;
    type SupplierData = z.infer<typeof AddSupplierSchema>;

    const onSubmit = async (data: SupplierData) => {
        try {
            await add(data).then(()=>{
                form.reset()
            });
            toast.success("Supplier added successfully!");
        } catch (e: any) {
            toast.error(e.message);
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardDescription>
                    Fill in the details to create a new customer
                </CardDescription>
            </CardHeader>
            <Form {...form}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <CardContent className="space-y-3">
                        <div className="flex flex-col gap-3 ">

                            <div className="flex items-start gap-3">
                                <FormInput
                                    control={form.control}
                                    name="name"
                                    title='Supplier Name'
                                    placeholder="Enter customer name"
                                />

                                <FormInput
                                    control={form.control}
                                    name="phone"
                                    title='Phone'
                                    placeholder="Enter customer phone"
                                />
                            </div>
                            <FormInput
                                control={form.control}
                                name="gold"
                                title='Gold'
                                placeholder="Enter customer phone"
                            />
                            <FormInput
                                control={form.control}
                                name="cash"
                                title='Cash'
                                placeholder="Enter customer phone"
                            />
                            <FormInput
                                control={form.control}
                                name="silver"
                                title='Silver'
                                placeholder="Enter customer phone"
                            />
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

export default AddSupplierModule;