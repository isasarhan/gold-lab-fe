import React, { FC } from 'react';
import Table, { Column } from '@/components/common/table';
import { Pen, Trash } from 'lucide-react';
import ConfirmDialog from '../../../../components/common/discard-dialog';
import { IAddSupply } from '@/types/supply';
import { dateFormatter } from '@/lib/dateFormatter';

export interface SuppliesTableProps {
    supplies: IAddSupply[];
    onEdit(value: IAddSupply, id: number): void
    onDelete(id: number, value?: IAddSupply): void
}

const SuppliesTable: FC<SuppliesTableProps> = ({ supplies, onEdit, onDelete }) => {
    const handleEdit = (data: IAddSupply, index: number) => {
        onEdit(data, index)
    }
    const handleDelete = (index: number, value?: IAddSupply) => {
        onDelete(index, value)
    }
    const columns: Column[] = [
        {
            label: 'Weight',
            value: 'weight'
        },
        {
            label: 'karat',
            value: 'karat'
        },
        {
            label: 'Cash',
            value: 'cash'
        },
        {
            label: 'Per Gram',
            value: 'perGram'
        },
        {
            label: 'Type',
            value: 'type'
        },
        {
            label: "Date",
            render: (item: IAddSupply) =>
                <div>
                    {dateFormatter(item.date.toString())}
                </div>
        },
        {
            label: 'Description',
            value: 'description'
        },
        {
            label: 'Edit',
            render: (value: IAddSupply, index) => (
                <div className='flex justify-center items-center w-full'>
                    <Pen onClick={() => handleEdit(value, index)} size={20} />
                </div>
            )
        },
        {
            label: 'Delete',
            render: (value: IAddSupply, index) => (
                <div className='flex justify-center items-center w-full'>
                    <ConfirmDialog
                        onConfirm={() => handleDelete(index, value)}
                        text="Delete Supplies"
                        title="Delete Supplies"
                        description="Are you sure you want to delete Supplies?">
                        <Trash size={20} />
                    </ConfirmDialog>

                </div>
            )
        }
    ]
    return (
        <Table columns={columns} data={supplies} />
    );
};

export default SuppliesTable;