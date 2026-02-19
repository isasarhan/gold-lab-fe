import { ColumnDef } from '@tanstack/react-table';
import { IUser } from '@/types/user';
import { Eye, Pen, Trash } from 'lucide-react';
import Link from 'next/link';
import { Switch } from '@/components/ui/switch';
import ConfirmDialog from '@/components/common/discard-dialog';
import React from 'react';

export const createUserColumns = (
  onChangePublicity: (user: IUser) => void,
  onDelete: (index: number, user: IUser) => void
): ColumnDef<IUser>[] => [
  {
    id: 'username',
    header: 'User Name',
    cell: ({ row }) => (
      <div className="flex justify-center items-center w-full">
        {row.original.username}
      </div>
    ),
  },
  {
    id: 'role',
    header: 'Role',
    cell: ({ row }) => (
      <div className="flex justify-center items-center w-full">
        {row.original.role}
      </div>
    ),
  },
  {
    id: 'view',
    header: 'View More',
    cell: ({ row }) => (
      <div className="flex justify-center items-center w-full">
        <Link href={`/admin/users/${row.original._id}`}>
          <Eye size={20} />
        </Link>
      </div>
    ),
  },
  {
    id: 'isApproved',
    header: 'Is Approved',
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <Switch
          checked={row.original.isApproved}
          onCheckedChange={() => onChangePublicity(row.original)}
        />
      </div>
    ),
  },
  {
    id: 'edit',
    header: 'Edit',
    cell: ({ row }) => (
      <div className="flex justify-center items-center w-full">
        <Link href={`/admin/users/${row.original._id}/edit`}>
          <Pen size={20} />
        </Link>
      </div>
    ),
  },
  {
    id: 'delete',
    header: 'Delete',
    cell: ({ row }) => (
      <div className="flex justify-center">
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
