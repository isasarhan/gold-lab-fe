'use client'
import { useUserContext } from '@/providers/UserProvider';
import useSupplyPayments from '@/services/payments';
import { ISupplier } from '@/types/supplier';
import { IAddSupplyPayment } from '@/types/supply-payments';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AddPaymentSchema } from '../validation';
import { Currency } from '@/types/receipts';
import * as z from 'zod'
import { toast } from 'sonner';
import { Form } from '@/components/ui/form';
import { Card } from '@/components/ui/card';
import FormSelect from '@/components/common/form/select';
import FormInput from '@/components/common/form/input';
import FormDate from '@/components/common/form/date';
import { Karat } from '@/types/invoice';
import FormTextArea from '@/components/common/form/textarea';
import { Button } from '@/components/ui/button';
import ConfirmDialog from '@/components/common/discard-dialog';
import PaymentsTable from '../components/payments-table';
import FormAutocomplete from '@/components/common/form/autocomplete';
import { parseReceiptKarat } from '@/lib/parseKarat';

export interface AddPaymentModuleProps {
    suppliers: ISupplier[];
}
const AddPaymentModule: FC<AddPaymentModuleProps> = ({ suppliers }) => {
    const { token } = useUserContext();
    const { addMany } = useSupplyPayments({ token })
    const [payments, setPayments] = useState<IAddSupplyPayment[]>([])

    const form = useForm({
        mode: "onBlur",
        resolver: zodResolver(AddPaymentSchema),
        defaultValues: {
            currency: Currency.Usd,
            karat: 995
        }
    });

    const { handleSubmit } = form;

    type PaymentData = z.infer<typeof AddPaymentSchema>;

    const handleSave = async () => {
        try {
            await addMany(payments).then(() => {
                toast.success("Payments added successfully!");
                handleDiscardReceipt()
            })

        } catch (e: any) {
            toast.error(e.message);
        }
    }
    const onSubmit = async (data: PaymentData) => {
        form.reset({
            supplier: data.supplier,
            date: data.date,
            invoiceNb: data.invoiceNb,
        })
        setPayments(prev => [...prev, data])
    };
    const handleEditReceipt = (receipt: IAddSupplyPayment, index: number) => {
        setPayments(prevReceipts => prevReceipts.filter((_, i) => i !== index));
        form.reset(receipt)
    };
    const handleDeleteReceipt = (index: number) => {
        setPayments(prevReceipts => prevReceipts.filter((_, i) => i !== index));
    };
    const handleDiscardReceipt = () => {
        setPayments([]);
        form.reset({
            currency: Currency.Usd,
            karat: 995

        })
    };
        const getTotals = () => {
            return payments.reduce((total, payment) => {
                return {
                    gold: total.gold + (payment?.weight ? (payment?.weight * parseReceiptKarat(payment.karat!)) : 0),
                    cash: total.cash + (payment?.cash || 0)
                }
            }, { gold: 0, cash: 0 })
        }
    return (
        <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                <Card className="p-5">
                    <div className="flex gap-3">
                        <div className="flex items-start w-1/3">
                            <FormAutocomplete
                                control={form.control}
                                name="supplier"
                                title="supplier"
                                placeholder="Select supplier"
                                options={suppliers.map((supplier) => ({
                                    key: supplier._id,
                                    value: supplier._id!,
                                    label: supplier.name,
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
                                defaultValue={new Date()}
                                placeholder="Pick a date"
                            />
                        </div>
                    </div>
                </Card>
                <Card className="p-5">
                    <div className="flex gap-3">
                        <div className="flex items-end w-1/3">
                            <FormInput
                                control={form.control}
                                name="weight"
                                title='Weight'
                                placeholder="Enter quantity"
                            />
                        </div>
                        <div className="flex items-end w-1/3">
                            <FormInput
                                control={form.control}
                                name="karat"
                                title='Karat'
                                placeholder="Enter karat"
                            />
                        </div>
                        <div className="flex items-end w-1/3">
                            <FormInput
                                control={form.control}
                                name="cash"
                                title='Cash'
                                placeholder="Enter quantity"
                            />
                        </div>
                        <div className="flex items-end w-1/6">
                            <FormSelect
                                control={form.control}
                                name="currency"
                                title='Currency'
                                placeholder="Select Type"
                                options={Object.values(Currency).map((cur) => ({
                                    label: cur,
                                    value: cur
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

                    <div className="flex justify-between">
                        <div>
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
                <PaymentsTable payments={payments} onDelete={handleDeleteReceipt} onEdit={handleEditReceipt} />
            </form>
        </Form>
    );
};

export default AddPaymentModule;