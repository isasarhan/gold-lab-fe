'use client'

import Table, { Column } from '@/components/common/table';
import { dateFormatter } from '@/lib/dateFormatter';
import { useUserContext } from '@/providers/UserProvider';
import useInvoices from '@/services/invoices';
import { ICustomer } from '@/types/customer';
import { IInvoice, IِAddInvoice } from '@/types/invoice';
import { Eye, Pencil, Trash } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { FC } from 'react';
import { toast } from 'sonner';
import ConfirmDialog from '../../../components/common/discard-dialog';
import CustomerDatesfilter from '@/components/common/customer-dates-filters';

export interface InvoicesModuleProps {
    customers: ICustomer[]

    data: {
        data: IِAddInvoice[]
        total: number;
        page: number;
        pages: number;
    }
}


const InvoicesModule: FC<InvoicesModuleProps> = ({ data, customers }) => {
    const { token } = useUserContext();
    const { remove } = useInvoices({ token })
    const router = useRouter()

    const handleDelete = async (item: IInvoice) => {
        try {
            await remove(item?._id!).then(() => {
                toast.success("invoice removed successfully!");
                router.refresh()
            })

        } catch (e: any) {
            toast.error(e.message);
        }
    }
    const columns: Column[] = [
        { value: "invoiceNb", label: "Invoice #" },
        {
            label: "Date",
            render: (item: IِAddInvoice) =>
                <div>
                    {dateFormatter(item.date.toString())}
                </div>
        },
        {
            value: "totalWeight", label: "Total Weight",
            render: (item: IِAddInvoice) => (
                <div>{item.totalWeight?.toFixed(2)}</div>
            )
        },
        {
            value: "totalCash", label: "Total Cash",
            render: (item: IِAddInvoice) => (
                <div>{item.totalCash?.toFixed(2)}</div>
            )
        },
        {
            label: "View",
            render: (item) => (
                <Link href={`/admin/invoices/${item._id}`}>
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
                <ConfirmDialog
                    onConfirm={() => handleDelete(item)}
                    text="Delete Order"
                    title="Delete Order"
                    description="Are you sure you want to delete order?">
                    <Trash size={20} />
                </ConfirmDialog>
            ),
        },
    ];

 
    return (
        <div className="flex flex-col gap-3 pb-7">
            <CustomerDatesfilter customers={customers}/>
            <Table data={data.data} columns={columns} page={data.page} pages={data.pages} total={data.total} />
        </div>

    );
};

export default InvoicesModule;