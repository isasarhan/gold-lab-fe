'use client'
import CustomerDatesfilter from '@/components/common/customer-dates-filters';
import Table from '@/components/common/table';
import { createReceiptColumns } from '@/components/columns/receipts-columns';
import { ICustomer } from '@/types/customer';
import { IِReceipt } from '@/types/receipts';
import React, { FC, useMemo } from 'react';
import { deleteReceipt } from '@/network/external/receipts';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export interface ReceiptsModuleProps {
    customers: ICustomer[]
    data: {
        data: IِReceipt[]
        total: number;
        page: number;
        pages: number;
    }
}

const ReceiptsModule: FC<ReceiptsModuleProps> = ({ data, customers }) => {
    const router = useRouter()

    const handleDelete = async (item: IِReceipt) => {
        try {
            await deleteReceipt(item?._id!).then(() => {
                toast.success("receipt removed successfully!");
                router.refresh()
            })

        } catch (e: any) {
            toast.error(e.message);
        }
    }

    const columns = useMemo(() => createReceiptColumns(handleDelete), []);

    return (
        <div className="flex flex-col gap-3 pb-7">
            <CustomerDatesfilter customers={customers} />
            <Table data={data.data} columns={columns} page={data.page} pages={data.pages} total={data.total} />
        </div>
    );
};

export default ReceiptsModule;
