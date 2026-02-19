import { ColumnDef } from '@tanstack/react-table';
import { IِAddReceipt } from '@/types/receipts';
import ConfirmDialog from '@/components/common/discard-dialog';
import { Pen, Trash } from 'lucide-react';
import React from 'react';

export const createReceiptItemColumns = (
  onEdit: (value: IِAddReceipt, id: number) => void,
  onDelete: (id: number, value?: IِAddReceipt) => void
): ColumnDef<IِAddReceipt>[] => [
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
          text="Delete Receipt"
          title="Delete Receipt"
          description="Are you sure you want to delete Receipt?"
        >
          <Trash size={20} />
        </ConfirmDialog>
      </div>
    ),
  },
];
