import Title from '@/components/common/title';
import { getAuth } from '@/lib/auth';
import PaymentsModule from '@/modules/admin/payments';
import useSupplyPayments from '@/services/payments';
import useSuppliers from '@/services/supplier';
import React, { FC } from 'react';

export interface PaymentsPageProps {
    searchParams: Promise<{
        query: string, supplier: string, startDate: string, endDate: string, page: number;
    }>
}

const PaymentsPage: FC<PaymentsPageProps> = async ({ searchParams }) => {
    const { query, supplier, startDate, endDate, page } = await searchParams

    const { token } = await getAuth();

    const { getAll: getSuppliers } = useSuppliers({ token })
    const { getAll: getPayments } = useSupplyPayments({ token })
    const [suppliers, payments] = await Promise.all(
        [getSuppliers({}), getPayments({ searchTerm: query, page, supplier, startDate, endDate })])
        
    return (
        <>
            <Title text='All Payments' buttonText='Add Payment' url='/admin/payments/add' />
            <PaymentsModule data={payments} suppliers={suppliers} />
        </>
    );
};

export default PaymentsPage;