'use client'
import { useUserContext } from '@/providers/UserProvider';
import useReceipts from '@/services/receipts';
import { ICustomer } from '@/types/customer';
import React, { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AddReceiptSchema } from '../validation';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod'
import { toast } from 'sonner';
import { Currency, IِAddReceipt } from '@/types/receipts';
import FormSelect from '@/components/common/form/select';
import { Card } from '@/components/ui/card';
import FormDate from '@/components/common/form/date';
import FormInput from '@/components/common/form/input';
import { Form } from '@/components/ui/form';
import FormTextArea from '@/components/common/form/textarea';
import { Button } from '@/components/ui/button';
import ConfirmDialog from '../../../../components/common/discard-dialog';
import ReceiptTable from '../components/receipt-table';
import FormAutocomplete from '@/components/common/form/autocomplete';
import { parseReceiptKarat } from '@/lib/parseKarat';

export interface AddReceiptModuleProps {
    customers: ICustomer[]
}

const AddReceiptModule: FC<AddReceiptModuleProps> = ({ customers }) => {
    const { token } = useUserContext();
    const { addMany } = useReceipts({ token })
    const [receipts, setReceipts] = useState<IِAddReceipt[]>([])

    const form = useForm({
        mode: "onBlur",
        resolver: zodResolver(AddReceiptSchema),
        defaultValues: {
            karat: 995
        }
    });
    const { handleSubmit } = form;

    type ReceiptData = z.infer<typeof AddReceiptSchema>;

    const handleSave = async () => {
        try {
            await addMany(receipts).then(() => {
                toast.success("Payments added successfully!");
                handleDiscardReceipt()
            })

        } catch (e: any) {
            toast.error(e.message);
        }
    }
    const onSubmit = async (data: ReceiptData) => {
        form.reset({
            customer: data.customer,
            date: data.date,
            invoiceNb: data.invoiceNb,
            karat: 995,
            currency: Currency.Usd
        })
        setReceipts(prev => [...prev, data])
    };
    const handleEditReceipt = (receipt: IِAddReceipt, index: number) => {
        setReceipts(prevReceipts => prevReceipts.filter((_, i) => i !== index));
        form.reset(receipt)
    };
    const handleDeleteReceipt = (index: number) => {
        setReceipts(prevReceipts => prevReceipts.filter((_, i) => i !== index));
    };
    const handleDiscardReceipt = () => {
        setReceipts([]);
        form.reset({
            karat: 995
        })
    };
    const getTotals = () => {
        return receipts.reduce((total, receipt) => {
            return {
                gold: total.gold + (receipt?.weight ? (receipt?.weight * parseReceiptKarat(receipt.karat!)) : 0),
                cash: total.cash + (receipt?.cash || 0)
            }
        }, { gold: 0, cash: 0 })
    }
    return (
        <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                <Card className="p-5">
                    <div className="flex gap-3 flex-col lg:flex-row">
                        <div className="flex items-start lg:w-1/3 ">
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
                                placeholder="Pick a date"
                            />
                        </div>
                    </div>
                </Card>
                <Card className="p-5">
                    <div className="flex gap-3 flex-col lg:flex-row">
                        <div className="flex items-end lg:w-1/3">
                            <FormInput
                                control={form.control}
                                name="weight"
                                title='Weight'
                                placeholder="Enter quantity"
                            />
                        </div>
                        <div className="flex items-end lg:w-1/3">
                            <FormInput
                                control={form.control}
                                name="karat"
                                title='Karat'
                                placeholder="Enter price per weight"
                            />
                        </div>
                        <div className="flex items-end lg:w-1/3">
                            <FormInput
                                control={form.control}
                                name="cash"
                                title='Cash'
                                placeholder="Enter quantity"
                            />
                        </div>
                        <div className="flex items-end lg:w-1/6">
                            <FormSelect
                                control={form.control}
                                name="currency"
                                title='Currency'
                                placeholder="Select Type"
                                options={Object.values(Currency).map((currency) => ({
                                    label: currency,
                                    value: currency
                                }))}
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
                                onConfirm={handleDiscardReceipt}
                                text="Discard Receipt"
                                title="Discard Receipt"
                                description="Are you sure you want to discard receipt?">
                                <Button type="button" variant={'destructive'}>Discard Receipt</Button>
                            </ConfirmDialog>
                            <Button type="button" onClick={handleSave}>Save Receipt</Button>
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
                <ReceiptTable receipts={receipts} onDelete={handleDeleteReceipt} onEdit={handleEditReceipt} />
            </form>
        </Form>
    );
};

export default AddReceiptModule;