'use client'
import { ISupplier } from '@/types/supplier';
import React, { FC, useEffect } from 'react';
import * as z from 'zod'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
} from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { toast } from 'sonner';
import FormInput from '@/components/common/form/input';
import { Button } from '@/components/ui/button';
import FormTextArea from '@/components/common/form/textarea';
import { useUserContext } from '@/providers/UserProvider';
import useSuppliers from '@/services/supplier';
import { Form } from '@/components/ui/form';

export interface EditSupplierModuleProps {
    supplier: ISupplier;
}
const EditSupplierModule: FC<EditSupplierModuleProps> = ({ supplier }) => {
    const { token } = useUserContext();
    const { update } = useSuppliers({ token })


    const form = useForm({
        mode: "onBlur",
    });

    const { handleSubmit } = form;

    useEffect(() => {
        form.reset(supplier)
    }, [supplier])

    const onSubmit = async (data: any) => {
        try {
            const { name, phone, gold, cash, silver, description } = data
            await update(supplier._id!, {name, phone, gold, cash, silver, description })
            toast.success("Supplier updated successfully!");
        } catch (e: any) {
            toast.error(e.message);
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardDescription>
                    Fill in the details to create a new supplier
                </CardDescription>
            </CardHeader>
            <Form {...form}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <CardContent className="space-y-3">
                        <div className="flex flex-col gap-3 ">

                            <div className="flex items-start gap-3 flex-col lg:flex-row">
                                <FormInput
                                    control={form.control}
                                    name="name"
                                    title='Full Name'
                                    placeholder="Enter supplier name"
                                />

                                <FormInput
                                    control={form.control}
                                    name="phone"
                                    title='Phone'
                                    placeholder="Enter supplier phone"
                                />
                            </div>
                            <FormInput
                                control={form.control}
                                name="gold"
                                title='Gold'
                                placeholder="Enter supplier gold balance"
                            />
                            <FormInput
                                control={form.control}
                                name="cash"
                                title='Cash'
                                placeholder="Enter supplier cash balance"
                            />
                            <FormInput
                                control={form.control}
                                name="silver"
                                title='Silver'
                                placeholder="Enter supplier silver balance"
                            />
                            <FormTextArea
                                control={form.control}
                                name="description"
                                title='Description'
                                placeholder="Enter description"
                            />
                        </div>
                        <Button type="submit" className="w-full">
                            Update
                        </Button>
                    </CardContent>
                </form>
            </Form>
        </Card>
    );
};

export default EditSupplierModule;