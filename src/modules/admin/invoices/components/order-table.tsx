import { IOrder } from '@/types/invoice';
import React, { FC } from 'react';
import Table, { Column } from '@/components/common/table';
import { Pen, Trash } from 'lucide-react';
import ConfirmDialog from './discard-dialog';

export interface OrderTableProps {
    orders: IOrder[];
    onEdit(value: IOrder, id: number): void
    onDelete(id: number, value?: IOrder): void
}

const OrderTable: FC<OrderTableProps> = ({ orders, onEdit, onDelete }) => {
    const handleEdit = (data: IOrder, index: number) => {
        onEdit(data, index)
    }
    const handleDelete = (index: number, value?:IOrder) => {
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
            label: 'Per Gram',
            value: 'perGram'
        },
        {
            label: 'Per Item',
            value: 'perItem'
        },
        {
            label: 'Type',
            value: 'type'
        },
        {
            label: 'Quantity',
            value: 'quantity'
        },
        {
            label: 'Description',
            value: 'description'
        },
        {
            label: 'Edit',
            render: (value: IOrder, index) => (
                <div className='flex justify-center items-center w-full'>
                    <Pen onClick={() => handleEdit(value, index)} size={20} />
                </div>
            )
        },
        {
            label: 'Delete',
            render: (value: IOrder, index) => (
                <div className='flex justify-center items-center w-full'>
                    <ConfirmDialog
                        onConfirm={() => handleDelete(index, value)}
                        text="Delete Order"
                        title="Delete Order"
                        description="Are you sure you want to delete order?">
                        <Trash size={20} />
                    </ConfirmDialog>

                </div>
            )
        }
    ]
    return (
        <Table columns={columns} data={orders} />
    );
};

export default OrderTable;