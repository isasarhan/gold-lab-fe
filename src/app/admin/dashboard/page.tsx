import AdminDashboardModule from "@/modules/admin/dashboard";
import { getBalancesTotal } from "@/network/external/balances";
import {
  getAllCustomers,
  getCustomerTypesAnalytics,
} from "@/network/external/customers";
import React, { FC } from "react";

export interface DashboardPageProps {
  searchParams: Promise<{
    query: string;
    page: number;
  }>;
}

const DashboardPage: FC<DashboardPageProps> = async ({ searchParams }) => {
  const { query, page } = await searchParams;


  const [total, customersAnalytics, customers] = await Promise.all([
    getBalancesTotal(),
    getCustomerTypesAnalytics(),
    getAllCustomers({ searchTerm: query, page, pageSize: 10 }),
  ]);

  return (
    <AdminDashboardModule
      balanceTotal={total}
      customersAnalytics={customersAnalytics}
      customers={customers}
    />
  );
};

export default DashboardPage;
