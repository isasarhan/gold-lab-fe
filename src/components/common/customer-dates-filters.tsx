'use client'
import React, { FC } from 'react';
import FormDate from '@/components/common/form/date';
import FormSelect from '@/components/common/form/select';
import PaginationComp from '@/components/common/pagination';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { usePathname, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { ICustomer } from '@/types/customer';
export interface CustomerDatesfilterProps {
    customers: ICustomer[]

}

interface Filter {
    customer: string,
    startDate: Date,
    endDate: Date
}
const CustomerDatesfilter: FC<CustomerDatesfilterProps> = ({ customers }) => {
    const pathName = usePathname()
    const router = useRouter()
    const form = useForm<Filter>({
        mode: "onBlur",
    });
    const { handleSubmit } = form;

    const onSubmit = async (data: Filter) => {
        if (!data.customer) {
            toast.error('choose a customer')
            return
        }
        const params = new URLSearchParams();
        if (data.customer) params.append("customer", data.customer);
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
                        <FormSelect
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

export default CustomerDatesfilter;