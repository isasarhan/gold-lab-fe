'use client'
import FormDate from '@/components/common/form/date';
import FormSelect from '@/components/common/form/select';
import PaginationComp from '@/components/common/pagination';
import Table, { Column } from '@/components/common/table';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { dateFormatter } from '@/lib/dateFormatter';
import { ICustomer } from '@/types/customer';
import { IInvoice } from '@/types/invoice';
import { Eye, Pencil, Trash } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

export interface InvoicesModuleProps {
    invoices: IInvoice[]
    customers: ICustomer[]
    total: number;
    page: number;
    pages: number;
}

interface Filter {
    customer: string,
    startDate: Date,
    endDate: Date
}

const InvoicesModule: FC<InvoicesModuleProps> = ({ invoices, customers, page, pages, total }) => {
    const pathName = usePathname()
    const router = useRouter()
    const form = useForm<Filter>({
        mode: "onBlur",
    });

    const columns: Column[] = [
        { value: "invoiceNb", label: "Invoice #" },
        {
            label: "Date",
            render: (item: IInvoice) =>
                <div>
                    {dateFormatter(item.date.toString())}
                </div>
        },
        {
            value: "totalWeight", label: "Total Weight",
            render: (item: IInvoice) => (
                <div>{item.totalWeight?.toFixed(2)}</div>
            )
        },
        {
            value: "totalCash", label: "Total Cash",
            render: (item: IInvoice) => (
                <div>{item.totalCash?.toFixed(2)}</div>
            )
        },
        {
            label: "View",
            render: (item) => (
                <Link href={`/dashboard/invoices/${item._id}`}>
                    <button className="btn btn-success"
                        type="button"><Eye /></button>
                </Link>
            ),
        },
        {
            label: "Edit",
            render: (item) => (
                <button className="btn btn-primary" type="button">
                    <Pencil />
                </button>
            ),
        },
        {
            value: "_id", label: "Delete",
            render: (item) => (
                <button className="btn btn-danger" type="button"><Trash /></button>
            ),
        },
    ];

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

    return (
        <div className="flex flex-col gap-3 pb-7">
            <Card className='p-5'>
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
                            <div className="flex-1 flex flex-col justify-end mb-2">
                                <Button type="submit">View Invoices</Button>
                            </div>
                        </div>
                    </form>
                </Form>
            </Card>

            <Table data={invoices} columns={columns} page={page} pages={pages} total={total} />
        </div>

    );
};

export default InvoicesModule;