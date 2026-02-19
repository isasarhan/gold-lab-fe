import { ColumnDef } from '@tanstack/react-table';
import { SupplyValues } from '@/components/form/SupplyForm/validation';
import ConfirmDialog from '@/components/common/discard-dialog';
import { dateFormatter } from '@/lib/dateFormatter';
import { Pen, Trash } from 'lucide-react';
import React from 'react';

export const createSupplyItemColumns = (
  onEdit: (value: SupplyValues, id: number) => void,
  onDelete: (id: number, value?: SupplyValues) => void
): ColumnDef<SupplyValues>[] => [
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
    header: 'Type',
    accessorKey: 'type',
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
          text="Delete Supplies"
          title="Delete Supplies"
          description="Are you sure you want to delete Supplies?"
        >
          <Trash size={20} />
        </ConfirmDialog>
      </div>
    ),
  },
];
