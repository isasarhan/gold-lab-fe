'use client'

import SearchInput from '@/components/common/searchInput';
import Table, { Column } from '@/components/common/table';
import { ICustomer } from '@/types/customer';
import { Eye, Pen } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { FC, useEffect, useState } from 'react';
export interface CustomersModuleProps {
    customers: ICustomer[];
}
const CustomersModule: FC<CustomersModuleProps> = ({ customers = [] }) => {
    const [filteredCustomers, setFilteredCustomers] = useState<ICustomer[]>(customers)
    const pathName = usePathname()
    const router = useRouter()

    useEffect(() => {
        if (customers)
            setFilteredCustomers(customers)
    }, [customers])

    const handleSearch = (query: string) => {
        router.push(`${pathName}?query=${query}`)
    }
    const column: Column[] = [
        {
            label: 'Full Name',
            value: 'name'
        },
        {
            label: 'Email',
            value: 'email'
        },
        {
            label: 'Phone',
            value: 'phone'
        },
        {
            label: 'Location',
            value: 'location'
        },
        {
            label: 'Type',
            value: 'type'
        },
        {
            label: 'Edit',
            render: (value: ICustomer) => (
                <div className='flex justify-center items-center w-full'>
                    <Link href={`/admin/balances/${value._id}/edit`}><Pen size={20} /> </Link>
                </div>
            )
        },
        {
            label: 'View More',
            value: '_id',
            render: (value: ICustomer) => (
                <div className='flex justify-center items-center w-full'>
                    <Link href={`/admin/customers/${value._id}`}><Eye size={20} /> </Link>
                </div>
            )
        }
    ]

    return (
        <div className='flex flex-col gap-3 pb-7'>
            <SearchInput className='w-full' handleSearch={handleSearch} />
            <Table data={filteredCustomers} column={column} />
        </div>
    );
};

export default CustomersModule;