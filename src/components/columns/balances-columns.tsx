import { ColumnDef } from '@tanstack/react-table';
import { IBalance } from '@/types/balance';
import { Pen } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

export const balanceColumns: ColumnDef<IBalance>[] = [
  {
    id: 'customer',
    header: 'Customer',
    cell: ({ row }) => (
      <div className="flex justify-center items-center w-full">
        {row.original.customer.name}
      </div>
    ),
  },
  {
    id: 'gold',
    header: 'Gold',
    cell: ({ row }) => <span>{row.original.gold.toFixed(2)}</span>,
  },
  {
    id: 'cash',
    header: 'Cash',
    cell: ({ row }) => <span>{row.original.cash.toFixed(2)}</span>,
  },
  {
    id: 'edit',
    header: 'Edit',
    cell: ({ row }) => (
      <div className="flex justify-center items-center w-full">
        <Link href={`/admin/balances/${row.original._id}/edit`}>
          <Pen size={20} />
        </Link>
      </div>
    ),
  },
];
