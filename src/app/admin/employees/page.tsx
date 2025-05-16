import Title from '@/components/common/title';
import { getAuth } from '@/lib/auth';
import EmployeesModule from '@/modules/admin/employee';
import useEmployees from '@/services/employees';
import React, { FC } from 'react';
export interface EmployeesPageProps {
    searchParams: Promise<{
        query: string
        page: number;
    }>
}
const EmployeesPage: FC<EmployeesPageProps> = async ({ searchParams }) => {
    const { query, page } = await searchParams
    const { token } = await getAuth();

    const { getAll } = useEmployees({ token })
    const data = await getAll({ searchTerm: query, page });
    return (
        <>
            <Title text='All Employees' buttonText='Add Employee' url='/admin/employees/add' />
            <EmployeesModule data={data} />
        </>
    );
};

export default EmployeesPage;