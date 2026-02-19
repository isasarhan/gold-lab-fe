import { getAuth } from "@/lib/auth";
import AdminDashboardModule from "@/modules/admin/dashboard";
import { getBalancesTotal } from "@/network/external/balances";
import {
  getAllCustomers,
  getCustomerTypesAnalytics,
} from "@/network/external/customers";

import React, { FC } from "react";

export interface DashboardPageProps {}

const DashboardPage: FC<DashboardPageProps> = async () => {
  const [total, customersAnalytics, customers] = await Promise.all([
    getBalancesTotal(),
    getCustomerTypesAnalytics(),
    getAllCustomers({ pageSize: 10 }),
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
