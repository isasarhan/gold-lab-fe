'use client'

import SearchInput from '@/components/common/searchInput';
import Table, { Column } from '@/components/common/table';

import { Switch } from '@/components/ui/switch';
import { useUserContext } from '@/providers/UserProvider';
import useUsers from '@/services/users';
import { IUser } from '@/types/user';
import { Eye, Pen, Trash, ViewIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { FC, useEffect, useState } from 'react';
import { toast } from 'sonner';
export interface UsersModuleProps {
    users: IUser[];
}
const UsersModule: FC<UsersModuleProps> = ({ users = [] }) => {
    const { token } = useUserContext()
    const { update } = useUsers({ token })
    const [filteredUsers, setFilteredUsers] = useState<IUser[]>(users)
    const searchParam = useSearchParams()
    const pathName = usePathname()
    const router = useRouter()

    useEffect(() => {
        if (users)
            setFilteredUsers(users)
    }, [users])

    const handleChangePublicity = async (user: IUser) => {
        await update(user._id!, { isApproved: !user.isApproved }).then(() => {
            router.refresh()
            toast.success('updated!')
        })
    }
    const handleSearch = (query: string) => {
        router.push(`${pathName}?query=${query}`)
    }
    const column: Column[] = [
        {
            label: 'First Name',
            value: 'firstName'
        },
        {
            label: 'Last Name',
            value: 'lastName'
        },
        {
            label: 'Email',
            value: 'email'
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
                    <Link href={`/admin/balances/${value._id}/edit`}><Pen size={20} /> </Link>
                </div>
            )
        },
        {
            label: 'Delete',
            render: (value: IUser) => (
                <div className='flex justify-center items-center w-full'>
                    <Trash size={20} />
                </div>
            )
        },
    ]

    return (
        <div className='flex flex-col gap-3 pb-7'>
            <SearchInput className='w-full' handleSearch={handleSearch} />
            <Table data={filteredUsers} columns={column} />
        </div>
    );
};

export default UsersModule;