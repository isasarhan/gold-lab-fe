'use client'
import { useUserContext } from '@/providers/UserProvider';
import useEmployees from '@/services/employees';
import { IEmployee } from '@/types/employee';
import React, { FC, useEffect } from 'react';
import { EditEmployeeSchema } from '../validation';
import { useForm } from 'react-hook-form';
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import FormInput from '@/components/common/form/input';
import { Button } from '@/components/ui/button';

export interface EditEmployeeModuleProps {
    employee: IEmployee
}

const EditEmployeeModule: FC<EditEmployeeModuleProps> = ({ employee }) => {
    const { token } = useUserContext();
    const { update } = useEmployees({ token })

    const form = useForm({
        mode: "onBlur",
        resolver: zodResolver(EditEmployeeSchema),
    });
    const { handleSubmit } = form;

    useEffect(() => {
        form.reset(employee)
    }, [employee])

    type employeeData = z.infer<typeof EditEmployeeSchema>;

    const onSubmit = async (data: employeeData) => {
        try {
            const { name, phone, position, salary, email } = data
            await update(employee?._id!, { name, phone, position, salary, email });
            toast.success("Employee updated successfully!");
        } catch (e: any) {
            toast.error(e.message);
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardDescription>
                    Fill in the details to update a new employee
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
                            Update
                        </Button>
                    </CardContent>
                </form>
            </Form>
        </Card>
    );
};

export default EditEmployeeModule;