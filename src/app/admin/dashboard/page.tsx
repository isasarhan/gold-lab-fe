import { getAuth } from '@/lib/auth';
import AdminDashboardModule from '@/modules/admin/dashboard';
import useBalances from '@/services/balances';
import useCustomers from '@/services/customers';
import React, { FC } from 'react';

export interface DashboardPageProps {
  searchParams: Promise<{
    query: string
    page: number;
  }>
}

const DashboardPage: FC<DashboardPageProps> = async ({ searchParams }) => {
  const { query, page } = await searchParams

  const { token } = await getAuth();

  const { getTotal } = useBalances({ token })
  const { getTypesAnalytics } = useCustomers({ token })
  const { getAll: getCustomers } = useCustomers({ token })

  const [total, customersAnalytics, customers] =
    await Promise.all([getTotal(), getTypesAnalytics(), getCustomers({ searchTerm: query, page, pageSize: 10 })]);

  return (
    <AdminDashboardModule balanceTotal={total} customersAnalytics={customersAnalytics} customers={customers} />
  );
};

export default DashboardPage;