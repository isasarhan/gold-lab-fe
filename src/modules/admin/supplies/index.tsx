'use client'
import Table from '@/components/common/table';
import { createSupplyColumns } from '@/components/columns/supplies-columns';
import SupplierDatesfilter from '@/components/common/supplier-dates-filters';
import { ISupplier } from '@/types/supplier';
import { ISupply } from '@/types/supply';
import React, { FC, useMemo } from 'react';
import { deleteSupply } from '@/network/external/supplies';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

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
    const router = useRouter()

    const handleDelete = async (item: ISupply) => {
        try {
            await deleteSupply(item?._id!).then(() => {
                toast.success("supply removed successfully!");
                router.refresh()
            })

        } catch (e: any) {
            toast.error(e.message);
        }
    }

    const columns = useMemo(() => createSupplyColumns(handleDelete), []);

    return (
        <div className="flex flex-col gap-3 pb-7">
            <SupplierDatesfilter suppliers={suppliers} />
            <Table data={data.data} columns={columns} page={data.page} pages={data.pages} total={data.total} />
        </div>
    );
};

export default SuppliesModule;
