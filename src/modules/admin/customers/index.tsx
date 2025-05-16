import Table, { Column } from '@/components/common/table';
import { ICustomer } from '@/types/customer';
import { Eye, Pen } from 'lucide-react';
import Link from 'next/link';
import React, { FC } from 'react';
export interface CustomersModuleProps {
    data: {
        data: ICustomer[];
        total: number;
        page: number;
        pages: number;
    }
}
const CustomersModule: FC<CustomersModuleProps> = ({ data }) => {
    console.log(data);
    
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
                    <Link href={`/admin/customers/${value._id}/edit`}><Pen size={20} /> </Link>
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
            <Table data={data.data} columns={column} page={data.page} pages={data.pages} total={data.total}/>
        </div>
    );
};

export default CustomersModule;