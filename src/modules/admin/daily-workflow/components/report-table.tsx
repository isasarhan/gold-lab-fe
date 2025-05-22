import { IReport } from '@/types/daily-workflow';
import React, { FC } from 'react';
import Table, { Column } from '@/components/common/table';
import { Pen, Trash } from 'lucide-react';
import ConfirmDialog from '../../../../components/common/discard-dialog';

export interface ReportTableProps {
    reports: IReport[];
    onEdit(value: IReport, id: number): void
    onDelete(id: number, value?: IReport): void
}

const ReportTable: FC<ReportTableProps> = ({ reports, onEdit, onDelete }) => {
    const handleEdit = (data: IReport, index: number) => {
        onEdit(data, index)
    }
    const handleDelete = (index: number, value?:IReport) => {
        onDelete(index, value)
    }
    const columns: Column[] = [
        {
            label: 'From',
            value: 'from'
        },
        {
            label: 'To',
            value: 'to'
        },
        {
            label: 'Karat',
            value: 'karat'
        },
        {
            label: 'Weight',
            value: 'weight'
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
            render: (value: IReport, index) => (
                <div className='flex justify-center items-center w-full'>
                    <Pen onClick={() => handleEdit(value, index)} size={20} />
                </div>
            )
        },
        {
            label: 'Delete',
            render: (value: IReport, index) => (
                <div className='flex justify-center items-center w-full'>
                    <ConfirmDialog
                        onConfirm={() => handleDelete(index, value)}
                        text="Delete Report"
                        title="Delete Report"
                        description="Are you sure you want to delete Report?">
                        <Trash size={20} />
                    </ConfirmDialog>

                </div>
            )
        }
    ]
    return (
        <Table columns={columns} data={reports} />
    );
};

export default ReportTable;