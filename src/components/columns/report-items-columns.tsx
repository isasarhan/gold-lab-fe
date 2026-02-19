import { ColumnDef } from '@tanstack/react-table';
import { IReport } from '@/types/daily-workflow';
import ConfirmDialog from '@/components/common/discard-dialog';
import { Pen, Trash } from 'lucide-react';
import React from 'react';

export const createReportItemColumns = (
  onEdit: (value: IReport, id: number) => void,
  onDelete: (id: number, value?: IReport) => void
): ColumnDef<IReport>[] => [
  {
    header: 'From',
    accessorKey: 'from',
  },
  {
    header: 'To',
    accessorKey: 'to',
  },
  {
    header: 'Karat',
    accessorKey: 'karat',
  },
  {
    header: 'Weight',
    accessorKey: 'weight',
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
          text="Delete Report"
          title="Delete Report"
          description="Are you sure you want to delete Report?"
        >
          <Trash size={20} />
        </ConfirmDialog>
      </div>
    ),
  },
];
