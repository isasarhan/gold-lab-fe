import { ColumnDef } from '@tanstack/react-table';
import { ISupplyPayment } from '@/types/supply-payments';
import ConfirmDialog from '@/components/common/discard-dialog';
import { dateFormatter } from '@/lib/dateFormatter';
import { Pen, Trash } from 'lucide-react';
import React from 'react';

export const createPaymentItemColumns = (
  onEdit: (value: ISupplyPayment, id: number) => void,
  onDelete: (id: number, value?: ISupplyPayment) => void
): ColumnDef<ISupplyPayment>[] => [
  {
    header: 'Invoice #',
    accessorKey: 'invoiceNb',
  },
  {
    header: 'Weight',
    accessorKey: 'weight',
  },
  {
    header: 'Karat',
    accessorKey: 'karat',
  },
  {
    header: 'Cash',
    accessorKey: 'cash',
  },
  {
    header: 'Currency',
    accessorKey: 'currency',
  },
  {
    id: 'date',
    header: 'Date',
    cell: ({ row }) => <div>{dateFormatter(row.original.date.toString())}</div>,
  },
  {
    header: 'Description',
    accessorKey: 'description',
  },
  {
    id: 'edit',
    header: 'Edit',
    cell: ({ row }) => (
      <div className="flex justify-center items-center w-full">
        <Pen onClick={() => onEdit(row.original, row.index)} size={20} />
      </div>
    ),
  },
  {
    id: 'delete',
    header: 'Delete',
    cell: ({ row }) => (
      <div className="flex justify-center items-center w-full">
        <ConfirmDialog
          onConfirm={() => onDelete(row.index, row.original)}
          text="Delete payments"
          title="Delete payments"
          description="Are you sure you want to delete payments?"
        >
          <Trash size={20} />
        </ConfirmDialog>
      </div>
    ),
  },
];
