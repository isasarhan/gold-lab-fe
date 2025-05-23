import Title from '@/components/common/title';
import { getAuth } from '@/lib/auth';
import ReceiptsModule from '@/modules/admin/receipts';
import useCustomers from '@/services/customers';
import useReceipts from '@/services/receipts';
import React, { FC } from 'react';

export interface ReceiptsPropsPage {
    searchParams: Promise<{
        query: string, customer: string, startDate: string, endDate: string, page: number;
    }>
}

const ReceiptsPage: FC<ReceiptsPropsPage> = async ({ searchParams }) => {
    const { query, customer, startDate, endDate, page } = await searchParams
    const { token } = await getAuth();

    const { getAll: getReceipts } = useReceipts({ token })
    const { getAll: getCustomers } = useCustomers({ token })

    const [customers, receipts] = await Promise.all(
        [getCustomers({ pageSize: 100 }), getReceipts({ searchTerm: query, page, customer, startDate, endDate })])

    return (
        <>
            <Title text='All Receipts' buttonText='Add Receipts' url='/admin/receipts/add' />
            <ReceiptsModule data={receipts} customers={customers.data} />
        </>
    );

};

export default ReceiptsPage;