import { ColumnDef } from '@tanstack/react-table';
import { ICustomer } from '@/types/customer';
import { Eye, Pen } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

export const customerColumns: ColumnDef<ICustomer>[] = [
  {
    header: 'Full Name',
    accessorKey: 'name',
  },
  {
    header: 'Email',
    accessorKey: 'email',
  },
  {
    header: 'Phone',
    accessorKey: 'phone',
  },
  {
    header: 'Location',
    accessorKey: 'location',
  },
  {
    header: 'Type',
    accessorKey: 'type',
  },
  {
    id: 'edit',
    header: 'Edit',
    cell: ({ row }) => (
      <div className="flex justify-center items-center w-full">
        <Link href={`/admin/customers/${row.original._id}/edit`}>
          <Pen size={20} />
        </Link>
      </div>
    ),
  },
  {
    id: 'view',
    header: 'View More',
    cell: ({ row }) => (
      <div className="flex justify-center items-center w-full">
        <Link href={`/admin/customers/${row.original._id}`}>
          <Eye size={20} />
        </Link>
      </div>
    ),
  },
];
