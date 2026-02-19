'use client'
import CustomerDatesfilter from '@/components/common/customer-dates-filters';
import { ICustomer } from '@/types/customer';
import { IِReceipt } from '@/types/receipts';
import React, { FC } from 'react';
import Table, { Column } from '@/components/common/table';
import { dateFormatter } from '@/lib/dateFormatter';
import ConfirmDialog from '@/components/common/discard-dialog';
import { Trash } from 'lucide-react';
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
    
    const columns: Column[] = [
        { value: "invoiceNb", label: "Invoice #" },
        { value: "weight", label: "Weight" },
        { value: "karat", label: "Karat" },
        { value: "cash", label: "Cash" },
        { value: "currency", label: "Currency" },
        {
            label: "Date",
            render: (item: IِReceipt) =>
                <div>
                    {dateFormatter(item.date.toString())}
                </div>
        },
        {
            value: "_id", label: "Delete",
            render: (item) => (
                <div className="flex justify-center">
                    <ConfirmDialog
                        onConfirm={() => handleDelete(item)}
                        text="Delete Order"
                        title="Delete Order"
                        description="Are you sure you want to delete order?">
                        <Trash size={20} />
                    </ConfirmDialog>
                </div>
            ),
        },
    ]
    return (
        <div className="flex flex-col gap-3 pb-7">
            <CustomerDatesfilter customers={customers} />
            <Table data={data.data} columns={columns} page={data.page} pages={data.pages} total={data.total} />
        </div>
    );
};

export default ReceiptsModule;