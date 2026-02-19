import { ColumnDef } from '@tanstack/react-table';
import { IEmployee } from '@/types/employee';
import { Pen } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

export const employeeColumns: ColumnDef<IEmployee>[] = [
  {
    header: 'Full Name',
    accessorKey: 'name',
  },
  {
    header: 'Email',
    accessorKey: 'email',
  },
  {
    header: 'Position',
    accessorKey: 'position',
  },
  {
    header: 'Phone',
    accessorKey: 'phone',
  },
  {
    header: 'Salary',
    accessorKey: 'salary',
  },
  {
    id: 'edit',
    header: 'Edit',
    cell: ({ row }) => (
      <div className="flex justify-center items-center w-full">
        <Link href={`/admin/employees/${row.original._id}/edit`}>
          <Pen size={20} />
        </Link>
      </div>
    ),
  },
];
