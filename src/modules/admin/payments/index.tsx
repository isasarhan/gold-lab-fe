'use client'
import ConfirmDialog from '@/components/common/discard-dialog';
import SupplierDatesfilter from '@/components/common/supplier-dates-filters';
import Table, { Column } from '@/components/common/table';
import { dateFormatter } from '@/lib/dateFormatter';
import { useUserContext } from '@/providers/UserProvider';
import useSupplyPayments from '@/services/payments';
import { ISupplier } from '@/types/supplier';
import { ISupplyPayment } from '@/types/supply-payments';
import { Eye, Pencil, Trash } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { FC } from 'react';
import { toast } from 'sonner';

export interface PaymentsModuleProps {
    suppliers: ISupplier[]

    data: {
        data: ISupplyPayment[]
        total: number;
        page: number;
        pages: number;
    }
}

const PaymentsModule: FC<PaymentsModuleProps> = ({ data, suppliers }) => {
    const { token } = useUserContext();
    const { remove } = useSupplyPayments({ token })
    const router = useRouter()

    const handleDelete = async (item: ISupplyPayment) => {
        try {
            await remove(item?._id!).then(() => {
                toast.success("supply payment removed successfully!");
                router.refresh()
            })

        } catch (e: any) {
            toast.error(e.message);
        }
    }
    const columns: Column[] = [
        {
            label: "Supplier",
            render: (item: ISupplyPayment) =>
                <div>
                    {item.supplier.name}
                </div>
        },
        { value: "invoiceNb", label: "Invoice #" },
        {
            label: "Date",
            render: (item: ISupplyPayment) =>
                <div>
                    {dateFormatter(item.date.toString())}
                </div>
        },
        {
            label: "Weight",
            render: (item: ISupplyPayment) => (
                <div>{item.weight?.toFixed(2)}</div>
            )
        },
        { value: "karat", label: "Karat" },
        {
            label: "Cash",
            render: (item: ISupplyPayment) => (
                <div>{item.cash?.toFixed(2)}</div>
            )
        },
        {
            label: "View",
            render: (item) => (
                <Link href={`/admin/supplies/${item._id}`}>
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

export default PaymentsModule;