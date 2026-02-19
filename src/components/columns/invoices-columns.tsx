import { ColumnDef } from '@tanstack/react-table';
import { IInvoice, IِAddInvoice } from '@/types/invoice';
import { dateFormatter } from '@/lib/dateFormatter';
import ConfirmDialog from '@/components/common/discard-dialog';
import { Eye, Pencil, Trash } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

export const createInvoiceColumns = (
  onDelete: (item: IInvoice) => void
): ColumnDef<IِAddInvoice>[] => [
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
    id: 'totalWeight',
    header: 'Total Weight',
    cell: ({ row }) => <div>{row.original.totalWeight?.toFixed(2)}</div>,
  },
  {
    id: 'totalCash',
    header: 'Total Cash',
    cell: ({ row }) => <div>{row.original.totalCash?.toFixed(2)}</div>,
  },
  {
    id: 'view',
    header: 'View',
    cell: ({ row }) => (
      <Link href={`/admin/invoices/${row.original._id}`}>
        <button className="btn btn-success" type="button">
          <Eye />
        </button>
      </Link>
    ),
  },
  {
    id: 'edit',
    header: 'Edit',
    cell: () => (
      <button className="btn btn-primary" type="button">
        <Pencil />
      </button>
    ),
  },
  {
    id: 'delete',
    header: 'Delete',
    cell: ({ row }) => (
      <div className="flex justify-center">
        <ConfirmDialog
          onConfirm={() => onDelete(row.original as unknown as IInvoice)}
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
