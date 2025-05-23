import Title from '@/components/common/title';
import { getAuth } from '@/lib/auth';
import EmployeePaymentsModule from '@/modules/admin/salary-payments';
import useSalaryPayments from '@/services/salary-payment';
import React, { FC } from 'react';

export interface EmployeePaymentsPageProps {
    searchParams: Promise<{ year: string, month: string }>
}

const fetchReport = async (
    year: string = new Date().getFullYear().toString(),
    month: string = new Date().getMonth().toString()
) => {
    console.log(year, month);
    
    const { token } = await getAuth();
    const { getAll } = useSalaryPayments({ token: token })
    return await getAll(year, month)
}


const EmployeePaymentsPage: FC<EmployeePaymentsPageProps> = async ({ searchParams }) => {
    const { year, month } = await searchParams;
    const report = await fetchReport(year, month)

    return (
        <>
            <Title text='Salary Payments' buttonText='Add Payment' url='/admin/employees/payments/add' />
            <EmployeePaymentsModule reports={report} />
        </>
    );
};

export default EmployeePaymentsPage;