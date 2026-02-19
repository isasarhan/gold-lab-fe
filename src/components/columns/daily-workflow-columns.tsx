import { ColumnDef } from '@tanstack/react-table';
import { IReportBalance } from '@/types/daily-workflow';
import React from 'react';

export const dailyWorkflowColumns: ColumnDef<IReportBalance>[] = [
  {
    id: 'sector',
    header: 'Sector',
    cell: ({ row }) => (
      <span className="capitalize">{row.original.sector}</span>
    ),
  },
  {
    header: 'Karat',
    accessorKey: 'karat',
  },
  {
    header: 'Weight (g)',
    accessorKey: 'weight',
  },
  {
    header: 'Quantity',
    accessorKey: 'quantity',
  },
];
