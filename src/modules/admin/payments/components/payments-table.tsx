import React, { FC } from 'react';
import Table, { Column } from '@/components/common/table';
import { Pen, Trash } from 'lucide-react';
import ConfirmDialog from '../../../../components/common/discard-dialog';
import { dateFormatter } from '@/lib/dateFormatter';
import { IAddSupplyPayment } from '@/types/supply-payments';

export interface PaymentsTableProps {
    payments: IAddSupplyPayment[];
    onEdit(value: IAddSupplyPayment, id: number): void
    onDelete(id: number, value?: IAddSupplyPayment): void
}

const PaymentsTable: FC<PaymentsTableProps> = ({ payments, onEdit, onDelete }) => {
    const handleEdit = (data: IAddSupplyPayment, index: number) => {
        onEdit(data, index)
    }
    const handleDelete = (index: number, value?: IAddSupplyPayment) => {
        onDelete(index, value)
    }
    const columns: Column[] = [
        {
            label: 'Invoice #',
            value: 'invoiceNb'
        },
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
            label: "Date",
            render: (item: IAddSupplyPayment) =>
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
            render: (value: IAddSupplyPayment, index) => (
                <div className='flex justify-center items-center w-full'>
                    <Pen onClick={() => handleEdit(value, index)} size={20} />
                </div>
            )
        },
        {
            label: 'Delete',
            render: (value: IAddSupplyPayment, index) => (
                <div className='flex justify-center items-center w-full'>
                    <ConfirmDialog
                        onConfirm={() => handleDelete(index, value)}
                        text="Delete payments"
                        title="Delete payments"
                        description="Are you sure you want to delete payments?">
                        <Trash size={20} />
                    </ConfirmDialog>

                </div>
            )
        }
    ]
    return (
        <Table columns={columns} data={payments} />
    );
};

export default PaymentsTable;