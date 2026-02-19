import { ColumnDef } from '@tanstack/react-table';
import { ISupplyPayment } from '@/types/supply-payments';
import { dateFormatter } from '@/lib/dateFormatter';
import ConfirmDialog from '@/components/common/discard-dialog';
import { Trash } from 'lucide-react';
import React from 'react';

export const createPaymentColumns = (
  onDelete: (item: ISupplyPayment) => void
): ColumnDef<ISupplyPayment>[] => [
  {
    id: 'supplier',
    header: 'Supplier',
    cell: ({ row }) => <div>{(row.original.supplier as any)?.name}</div>,
  },
  {
    header: 'Invoice #',
    accessorKey: 'invoiceNb',
  },
  {
    id: 'date',
    header: 'Date',
    cell: ({ row }) => <div>{dateFormatter(row.original.date.toString())}</div>,
  },
  {
    id: 'weight',
    header: 'Weight',
    cell: ({ row }) => <div>{row.original.weight?.toFixed(2)}</div>,
  },
  {
    header: 'Karat',
    accessorKey: 'karat',
  },
  {
    id: 'cash',
    header: 'Cash',
    cell: ({ row }) => <div>{row.original.cash?.toFixed(2)}</div>,
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
