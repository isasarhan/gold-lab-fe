import { ColumnDef } from '@tanstack/react-table';
import { IِReceipt } from '@/types/receipts';
import { dateFormatter } from '@/lib/dateFormatter';
import ConfirmDialog from '@/components/common/discard-dialog';
import { Trash } from 'lucide-react';
import React from 'react';

export const createReceiptColumns = (
  onDelete: (item: IِReceipt) => void
): ColumnDef<IِReceipt>[] => [
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
    id: 'delete',
    header: 'Delete',
    cell: ({ row }) => (
      <div className="flex justify-center">
        <ConfirmDialog
          onConfirm={() => onDelete(row.original)}
          text="Delete Order"
          title="Delete Order"
          description="Are you sure you want to delete order?"
        >
          <Trash size={20} />
        </ConfirmDialog>
      </div>
    ),
  },
];
