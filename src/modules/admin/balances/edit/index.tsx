'use client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { useUserContext } from '@/providers/UserProvider';
import useBalances from '@/services/balances';
import { IBalance, IBalanceUpdate } from '@/types/balance';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import { EditBalanceSchema } from '../validation';
import * as z from "zod";
import { toast } from 'sonner';
import FormInput from '@/components/common/form/input';
import { Button } from '@/components/ui/button';

export interface EditBalanceModuleProps {
    balance: IBalance
}

const EditBalanceModule: FC<EditBalanceModuleProps> = ({ balance }) => {
    const { token } = useUserContext();    
    const { update } = useBalances({ token })

    const form = useForm({
        mode: "onBlur",
        resolver: zodResolver(EditBalanceSchema),
        defaultValues: {
            cash: balance.cash,
            gold: balance.gold,
        }
    });
    const { handleSubmit } = form;

    type BalanceSchema = z.infer<typeof EditBalanceSchema>;

    const onSubmit = async (data: BalanceSchema) => {
        try {
            await update(balance._id!, { customer: balance.customer._id, gold: data.gold, cash: data.cash });
            toast.success("Balance updated successfully!");
        } catch (e: any) {
            toast.error(e.message);
        }
    };
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-2xl font-bold">Edit balance for {balance.customer.name}</CardTitle>
                <CardDescription>
                    Fill in the details to edit balance
                </CardDescription>
            </CardHeader>
            <Form {...form}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <CardContent className="space-y-3">
                        <div className="flex flex-col gap-4 ">

                            <FormInput
                                control={form.control}
                                name="gold"
                                title='Gold'
                                placeholder="Enter balance gold"
                            />
                            <FormInput
                                control={form.control}
                                name="cash"
                                title='Cash'
                                placeholder="Enter balance cash"
                            />

                            <Button type="submit" className="w-full">
                                Update
                            </Button>
                        </div>
                    </CardContent>
                </form>
            </Form>
        </Card >
    );
};

export default EditBalanceModule;