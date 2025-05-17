import { ISupplier } from '@/types/supplier';
import Table, { Column } from '@/components/common/table';
import React, { FC } from 'react';

export interface SuppliersModuleProps {
    suppliers: ISupplier[]
}

const SuppliersModule: FC<SuppliersModuleProps> = ({ suppliers }) => {
    const column: Column[] = [
        {
            label: 'Full Name',
            value: 'name'
        },
        {
            label: 'Phone',
            value: 'phone'
        },
        {
            label: 'Gold',
            render: (item: ISupplier) => (
                <div>{item.gold?.toFixed(2)}</div>
            )
        },
        {
            label: 'Cash',
            render: (item: ISupplier) => (
                <div>{item.cash?.toFixed(2)}</div>
            )
        },
        {
            label: 'Silver',
            value: 'silver'
        },
        {
            label: 'Description',
            value: 'description'
        },

    ]
    return (
        <div className='flex flex-col gap-3 pb-7'>
            <Table data={suppliers} columns={column} />
        </div>
    );
};

export default SuppliersModule;