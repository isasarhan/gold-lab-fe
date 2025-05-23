import { IEmployee } from '@/types/employee';
import PaginationComp from '@/components/common/pagination';
import Table, { Column } from '@/components/common/table';
import React, { FC } from 'react';
import Link from 'next/link';
import { Eye, Pen } from 'lucide-react';
export interface EmployeesModuleProps {
    data: {
        data: IEmployee[];
        total: number;
        page: number;
        pages: number;
    }
}
const EmployeesModule: FC<EmployeesModuleProps> = ({ data }) => {
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
            label: 'Position',
            value: 'position'
        },
        {
            label: 'Phone',
            value: 'phone'
        },
        {
            label: 'Salary',
            value: 'salary'
        },
        {
            label: 'Edit',
            value: '_id',
            render: (value: IEmployee) => (
                <div className='flex justify-center items-center w-full'>
                    <Link href={`/admin/employees/${value._id}/edit`}><Pen size={20} /> </Link>
                </div>
            )
        }
    ]

    return (
        <div className='flex flex-col gap-3 pb-7'>
            <Table data={data.data} columns={column} />
        </div>
    );
};

export default EmployeesModule;