import Title from '@/components/common/title';
import { Card } from '@/components/ui/card';
import { getAuth } from '@/lib/auth';
import YearlyAnalyticsFilter from '@/modules/admin/customers/analytics/filters';
import CustomerInvoiceAnalytics from '@/modules/admin/customers/analytics/invoice-analytics';
import CustomerReceiptsAnalytics from '@/modules/admin/customers/analytics/payments-analytics';
import ViewCustomerModule from '@/modules/admin/customers/view';
import useAnalytics from '@/services/analytics';
import useCustomers from '@/services/customers';
import React, { FC } from 'react';

export interface UsersPageProps {
    params: Promise<{ id: string }>,
    searchParams: Promise<{
        year?: number;
    }>
}

const UserPage: FC<UsersPageProps> = async ({ searchParams, params }) => {
    const { id } = await params;
    const { year } = await searchParams
    const { token } = await getAuth();
    console.log('year', year);

    const { getById } = useCustomers({ token: token })
    const { findTotalYearRevenue, findTotalYearPayments } = useAnalytics({ token })

    const [customer, revenue, receipts] = await Promise.all([getById(id), findTotalYearRevenue({ customerId: id, year }), findTotalYearPayments({ customerId: id, year })])

    return (
        <>
            <Title text='Customer Info' goBack={true} />
            <ViewCustomerModule customer={customer} />

            <CustomerInvoiceAnalytics chartData={revenue} />
            <CustomerReceiptsAnalytics chartData={receipts} />
        </>
    );
};

export default UserPage;