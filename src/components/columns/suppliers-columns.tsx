import { ColumnDef } from '@tanstack/react-table';
import { ISupplier } from '@/types/supplier';
import { Pen } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

export const supplierColumns: ColumnDef<ISupplier>[] = [
  {
    header: 'Full Name',
    accessorKey: 'name',
  },
  {
    header: 'Phone',
    accessorKey: 'phone',
  },
  {
    id: 'gold',
    header: 'Gold',
    cell: ({ row }) => <div>{row.original.weight?.toFixed(2)}</div>,
  },
  {
    id: 'cash',
    header: 'Cash',
    cell: ({ row }) => <div>{row.original.cash?.toFixed(2)}</div>,
  },
  {
    header: 'Silver',
    accessorKey: 'silver',
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
        <Link href={`/admin/suppliers/${row.original._id}/edit`}>
          <Pen size={20} />
        </Link>
      </div>
    ),
  },
];
