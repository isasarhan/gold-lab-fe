'use client'
import { useUserContext } from '@/providers/UserProvider';
import React, { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod'
import { toast } from 'sonner';
import FormSelect from '@/components/common/form/select';
import { Card } from '@/components/ui/card';
import FormDate from '@/components/common/form/date';
import FormInput from '@/components/common/form/input';
import { Form } from '@/components/ui/form';
import FormTextArea from '@/components/common/form/textarea';
import { Button } from '@/components/ui/button';
import ConfirmDialog from '../../../../components/common/discard-dialog';
import SuppliesTable from '../components/supplies-table';
import { ISupplier } from '@/types/supplier';
import { AddSupplySchema } from '../validation';
import { IAddSupply, ItemType } from '@/types/supply';
import useSupplies from '@/services/supplies';
import { Karat } from '@/types/invoice';
import FormAutocomplete from '@/components/common/form/autocomplete';
import { parseInvoiceKarat } from '@/lib/parseKarat';

export interface AddSupplyModuleProps {
    suppliers: ISupplier[]
}

const AddSupplyModule: FC<AddSupplyModuleProps> = ({ suppliers }) => {
    const { token } = useUserContext();
    const { addMany } = useSupplies({ token })
    const [supplies, setSupplies] = useState<IAddSupply[]>([])

    const form = useForm({
        mode: "onBlur",
        resolver: zodResolver(AddSupplySchema),
        defaultValues: {
            karat: Karat.K18
        }
    });

    const { handleSubmit } = form;

    type SupplyData = z.infer<typeof AddSupplySchema>;

    const handleSave = async () => {
        try {
            await addMany(supplies).then(() => {
                toast.success("Supplies added successfully!");
                handleDiscardReceipt()
            })
        } catch (e: any) {
            toast.error(e.message);
        }
    }
    const onSubmit = async (data: SupplyData) => {
        form.reset({
            supplier: data.supplier,
            date: data.date,
            invoiceNb: data.invoiceNb,
        })
        setSupplies(prev => [...prev, data])
    };
    const handleEditReceipt = (receipt: IAddSupply, index: number) => {
        setSupplies(prevReceipts => prevReceipts.filter((_, i) => i !== index));
        form.reset(receipt)
    };
    const handleDeleteReceipt = (index: number) => {
        setSupplies(prevReceipts => prevReceipts.filter((_, i) => i !== index));
    };
    const handleDiscardReceipt = () => {
        setSupplies([]);
        form.reset({
            karat: Karat.K18
        })
    };
    const getTotals = () => {
        return supplies.reduce((total, supply) => {
            return {
                gold: total.gold + (supply.weight * parseInvoiceKarat(supply.karat!) / 995),
                cash: total.cash + (supply.weight * supply.perGram)
            }
        }, { gold: 0, cash: 0 })
    }
    return (
        <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                <Card className="p-5">
                    <div className="flex gap-3 flex-col lg:flex-row ">
                        <div className="flex items-start lg:w-1/3">
                            <FormAutocomplete
                                control={form.control}
                                name="supplier"
                                title="Supplier"
                                placeholder="Select supplier"
                                options={suppliers.map((supplier) => ({
                                    key: supplier._id,
                                    value: supplier._id!,
                                    label: supplier.name,
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
                                defaultValue={new Date()}
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
                            <FormSelect
                                control={form.control}
                                name="karat"
                                title='Karat'
                                placeholder="Select Karat"
                                options={Object.values(Karat).map((karat) => ({
                                    label: karat,
                                    value: karat
                                }))}
                            />
                        </div>
                        <div className="flex items-end lg:w-1/3">
                            <FormInput
                                control={form.control}
                                name="perGram"
                                title='Per Gram'
                                placeholder="Enter quantity"
                            />
                        </div>
                        <div className="flex items-end lg:w-1/6">
                            <FormSelect
                                control={form.control}
                                name="type"
                                title='Type'
                                placeholder="Select Type"
                                options={Object.values(ItemType).map((type) => ({
                                    label: type,
                                    value: type
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
                <SuppliesTable supplies={supplies} onDelete={handleDeleteReceipt} onEdit={handleEditReceipt} />
            </form>
        </Form>
    );
};

export default AddSupplyModule;
