import React, { FC } from 'react';
import Table, { Column } from '@/components/common/table';
import { Pen, Trash } from 'lucide-react';
import ConfirmDialog from '../../../../components/common/discard-dialog';
import { IِAddReceipt, IِReceipt } from '@/types/receipts';

export interface ReceiptTableProps {
    receipts: IِAddReceipt[];
    onEdit(value: IِAddReceipt, id: number): void
    onDelete(id: number, value?: IِAddReceipt): void
}

const ReceiptTable: FC<ReceiptTableProps> = ({ receipts, onEdit, onDelete }) => {
    const handleEdit = (data: IِAddReceipt, index: number) => {
        onEdit(data, index)
    }
    const handleDelete = (index: number, value?:IِAddReceipt) => {
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
            label: 'Currency',
            value: 'currency'
        },
        {
            label: 'Description',
            value: 'description'
        },
        {
            label: 'Edit',
            render: (value: IِAddReceipt, index) => (
                <div className='flex justify-center items-center w-full'>
                    <Pen onClick={() => handleEdit(value, index)} size={20} />
                </div>
            )
        },
        {
            label: 'Delete',
            render: (value: IِAddReceipt, index) => (
                <div className='flex justify-center items-center w-full'>
                    <ConfirmDialog
                        onConfirm={() => handleDelete(index, value)}
                        text="Delete Receipt"
                        title="Delete Receipt"
                        description="Are you sure you want to delete Receipt?">
                        <Trash size={20} />
                    </ConfirmDialog>

                </div>
            )
        }
    ]
    return (
        <Table columns={columns} data={receipts} />
    );
};

export default ReceiptTable;