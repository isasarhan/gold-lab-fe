'use client'
import Table, { Column } from '@/components/common/table';
import SupplierDatesfilter from '@/components/common/supplier-dates-filters';
import { ISupplier } from '@/types/supplier';
import { ISupply } from '@/types/supply';
import React, { FC } from 'react';
import ConfirmDialog from '@/components/common/discard-dialog';
import { useUserContext } from '@/providers/UserProvider';
import useSupplies from '@/services/supplies';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { dateFormatter } from '@/lib/dateFormatter';
import Link from 'next/link';
import { Eye, Pencil, Trash } from 'lucide-react';

export interface SuppliesModuleProps {
    suppliers: ISupplier[]

    data: {
        data: ISupply[]
        total: number;
        page: number;
        pages: number;
    }
}

const SuppliesModule: FC<SuppliesModuleProps> = ({ data, suppliers }) => {
    const { token } = useUserContext();
    const { remove } = useSupplies({ token })
    const router = useRouter()

    const handleDelete = async (item: ISupply) => {
        try {
            await remove(item?._id!).then(() => {
                toast.success("supply removed successfully!");
                router.refresh()
            })

        } catch (e: any) {
            toast.error(e.message);
        }
    }
    const columns: Column[] = [
        {
            label: "Supplier",
            render: (item: ISupply) =>
                <div>
                    {item.supplier.name}
                </div>
        },
        { value: "invoiceNb", label: "Invoice #" },
        {
            label: "Date",
            render: (item: ISupply) =>
                <div>
                    {dateFormatter(item.date.toString())}
                </div>
        },
        {
            label: "Weight",
            render: (item: ISupply) => (
                <div>{item.weight?.toFixed(2)}</div>
            )
        },
        { value: "karat", label: "Karat" },
        {
            label: "Per Gram",
            render: (item: ISupply) => (
                <div>{item.perGram?.toFixed(2)}</div>
            )
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
    ];
    return (
        <div className="flex flex-col gap-3 pb-7">
            <SupplierDatesfilter suppliers={suppliers} />
            <Table data={data.data} columns={columns} page={data.page} pages={data.pages} total={data.total} />
        </div>
    );
};

export default SuppliesModule;