'use client'
import Table from '@/components/common/table';
import { createPaymentColumns } from '@/components/columns/payments-columns';
import SupplierDatesfilter from '@/components/common/supplier-dates-filters';
import { deleteSupplyPayment } from '@/network/external/supply-payments';
import { ISupplier } from '@/types/supplier';
import { ISupplyPayment } from '@/types/supply-payments';
import { useRouter } from 'next/navigation';
import React, { FC, useMemo } from 'react';
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
    const router = useRouter()

    const handleDelete = async (item: ISupplyPayment) => {
        try {
            await deleteSupplyPayment(item?._id!).then(() => {
                toast.success("supply payment removed successfully!");
                router.refresh()
            })

        } catch (e: any) {
            toast.error(e.message);
        }
    }

    const columns = useMemo(() => createPaymentColumns(handleDelete), []);

    return (
        <div className="flex flex-col gap-3 pb-7">
            <SupplierDatesfilter suppliers={suppliers} />
            <Table data={data.data} columns={columns} page={data.page} pages={data.pages} total={data.total} />
        </div>
    );
};

export default PaymentsModule;
