'use client'

import PaginationComp from '@/components/common/pagination';
import SearchInput from '@/components/common/searchInput';
import Table, { Column } from '@/components/common/table';
import { ICustomer } from '@/types/customer';
import { Eye, Pen } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { FC, useEffect, useState } from 'react';
export interface CustomersModuleProps {
    customers: ICustomer[];
    total: number;
    page: number;
    pages: number;
}
const CustomersModule: FC<CustomersModuleProps> = ({ customers = [], page, pages, total }) => {



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
            <div className="flex justify-between px-4">
                <div className='flex gap-3 text-xl font-bold'>Total: <span className='text-green-700'>{total}</span></div>
                <div className='w-fit'>
                    <PaginationComp page={page} pages={pages} total={total} />
                </div>
            </div>
            <Table data={customers} columns={column} />
        </div>
    );
};

export default CustomersModule;