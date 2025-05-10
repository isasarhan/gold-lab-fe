import Title from '@/components/common/title';
import { getAuth } from '@/lib/auth';
import InvoicesModule from '@/modules/admin/invoices';
import useCustomers from '@/services/customers';
import useInvoices from '@/services/invoices';
import React, { FC } from 'react';

export interface InvoicesPageProps {
    searchParams: Promise<{
        query: string, customer: string, startDate: string, endDate: string, page: number;
    }>
}

const InvoicesPage: FC<InvoicesPageProps> = async ({ searchParams }) => {
    const { query, customer, startDate, endDate, page } = await searchParams

    const { token, user } = await getAuth();

    const { getAll: getInvoices } = useInvoices({ token })
    const { getAll: getCustomers } = useCustomers({ token })

    // const data = await getAll({ searchTerm:query });
    const [customers, invoices] = await Promise.all(
        [getCustomers({}), getInvoices({ searchTerm: query, page, customer, startDate, endDate })])
    console.log(invoices);

    return (
        <>
            <Title text='All Invoices' />
            <InvoicesModule invoices={invoices.data} customers={customers.data}
                page={invoices.page} pages={invoices.pages} total={invoices.total} />
        </>
    );
};

export default InvoicesPage;