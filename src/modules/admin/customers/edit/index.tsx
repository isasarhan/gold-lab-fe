'use client'
import FormInput from '@/components/common/form/input';
import FormSelect from '@/components/common/form/select';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { useUserContext } from '@/providers/UserProvider';
import useCustomers from '@/services/customers';
import { CustomerType, ICustomer } from '@/types/customer';
import React, { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { isNil, omit, path, prop, reject } from 'ramda'

export interface EditCustomerModuleProps {
    customer: ICustomer
}

const EditCustomerModule: FC<EditCustomerModuleProps> = ({ customer }) => {
    const { token } = useUserContext();
    const { update } = useCustomers({ token })

    const form = useForm({
        mode: "onBlur",
    });

    const { handleSubmit } = form;

    useEffect(() => {
        form.reset(customer)
    }, [customer])

    const onSubmit = async (data: any) => {
        try {
            const { email, phone, name, type, location } = data
            await update(customer._id!, { email, phone, name, type, location });
            toast.success("Customer info updated successfully!");
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
                        <div className="flex flex-col gap-4 ">
                            <FormSelect
                                control={form.control}
                                name="type"
                                defaultValue={customer.type}
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
                        <Button type="submit" className="w-full">
                            Update
                        </Button>
                    </CardContent>
                </form>
            </Form>
        </Card>
    );
};

export default EditCustomerModule;