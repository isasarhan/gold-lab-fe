'use client'

import Table, { Column } from '@/components/common/table';
import { Switch } from '@/components/ui/switch';
import { useUserContext } from '@/providers/UserProvider';
import useUsers from '@/services/users';
import { IUser } from '@/types/user';
import { Eye, Pen, Trash } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { FC } from 'react';
import { toast } from 'sonner';
import ConfirmDialog from '../../../components/common/discard-dialog';
export interface UsersModuleProps {
    users: IUser[];
}
const UsersModule: FC<UsersModuleProps> = ({ users = [] }) => {
    const { token } = useUserContext()
    const { update, remove } = useUsers({ token })
    const router = useRouter()

    const handleChangePublicity = async (user: IUser) => {
        await update(user._id!, { isApproved: !user.isApproved }).then(() => {
            router.refresh()
            toast.success('updated!')
        })
    }
    const handleDelete = async (index: number, value: IUser) => {
        await remove(value._id!).then(() => {
            router.refresh()
            toast.success('user deleted!')
        })
    }

    const column: Column[] = [
        {
            label: 'Full Name',
            render: (value: IUser) => (
                <div className='flex justify-center items-center w-full'>
                    {value.name}
                </div>
            )
        },
        {
            label: 'Role',
            render: (value: IUser) => (
                <div className='flex justify-center items-center w-full'>
                    {value.role}
                </div>
            )
        },
        {
            label: 'View More',
            value: '_id',
            render: (value: IUser) => (
                <div className='flex justify-center items-center w-full'>
                    <Link href={`/admin/users/${value._id}`}><Eye size={20} /> </Link>
                </div>
            )
        },
        {
            label: 'Is Approved',
            value: 'isApproved',
            render: (value: IUser) => {
                return <div className="flex items-center justify-center" >
                    <Switch checked={value.isApproved} onCheckedChange={() => handleChangePublicity(value)} />
                </div>
            }
        },
        {
            label: 'Edit',
            render: (value: IUser) => (
                <div className='flex justify-center items-center w-full'>
                    <Link href={`/admin/users/${value._id}/edit`}><Pen size={20} /> </Link>
                </div>
            )
        },
        {
            label: 'Delete',
            render: (value: IUser, index) => (
                <div className='flex justify-center'>
                    <ConfirmDialog
                        onConfirm={() => handleDelete(index, value)}
                        text="Delete Order"
                        title="Delete Order"
                        description="Are you sure you want to delete order?">
                        <Trash size={20} />
                    </ConfirmDialog>
                </div>
            )
        },
    ]

    return (
        <div className='flex flex-col gap-3 pb-7'>
            <Table data={users} columns={column} />
        </div>
    );
};

export default UsersModule;