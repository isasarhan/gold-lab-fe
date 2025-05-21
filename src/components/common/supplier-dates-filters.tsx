'use client'
import React, { FC } from 'react';
import FormDate from '@/components/common/form/date';
import FormSelect from '@/components/common/form/select';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { usePathname, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { ISupplier } from '@/types/supplier';
import FormAutocomplete from './form/autocomplete';
export interface SupplierDatesfilterProps {
    suppliers: ISupplier[]
}

interface Filter {
    supplier: string,
    startDate: Date,
    endDate: Date
}
const SupplierDatesfilter: FC<SupplierDatesfilterProps> = ({ suppliers }) => {
    const pathName = usePathname()
    const router = useRouter()
    const form = useForm<Filter>({
        mode: "onBlur",
    });
    const { handleSubmit } = form;

    const onSubmit = async (data: Filter) => {
        const params = new URLSearchParams();
        if (data.supplier) params.append("supplier", data.supplier);
        if (data.startDate) {
            params.append("startDate", data.startDate.toISOString());
            params.append("endDate", data.endDate.toISOString());
        }
        router.push(`${pathName}?${params.toString()}`);
    };

    return <Card className='p-5'>
        <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-3 w-full md:flex-row">
                    <div className="flex-1">
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
                    <div className="flex-1">
                        <FormDate
                            control={form.control}
                            name="startDate"
                            title="Start Date"
                            placeholder="Pick a date"
                        />
                    </div>
                    <div className="flex-1">
                        <FormDate
                            control={form.control}
                            name="endDate"
                            defaultValue={new Date()}
                            title="End Date"
                            placeholder="Pick a date"
                        />
                    </div>
                    <div className="flex-1 flex flex-col justify-end">
                        <Button type="submit">View</Button>
                    </div>
                </div>
            </form>
        </Form>
    </Card>
};

export default SupplierDatesfilter;