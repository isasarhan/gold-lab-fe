import { ColumnDef } from '@tanstack/react-table';
import { IOrder } from '@/types/invoice';
import ConfirmDialog from '@/components/common/discard-dialog';
import { Pen, Trash } from 'lucide-react';
import React from 'react';

export const createOrderItemColumns = (
  onEdit: (value: IOrder, id: number) => void,
  onDelete: (id: number, value?: IOrder) => void
): ColumnDef<IOrder>[] => [
  {
    header: 'Weight',
    accessorKey: 'weight',
  },
  {
    header: 'Karat',
    accessorKey: 'karat',
  },
  {
    header: 'Per Gram',
    accessorKey: 'perGram',
  },
  {
    header: 'Per Item',
    accessorKey: 'perItem',
  },
  {
    header: 'Type',
    accessorKey: 'type',
  },
  {
    header: 'Quantity',
    accessorKey: 'quantity',
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
