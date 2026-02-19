import Title from "@/components/common/title";
import CustomerInvoiceAnalytics from "@/modules/admin/customers/analytics/invoice-analytics";
import CustomerReceiptsAnalytics from "@/modules/admin/customers/analytics/payments-analytics";
import ViewCustomerModule from "@/modules/admin/customers/view";
import {
  findTotalYearPayments,
  findTotalYearRevenue,
} from "@/network/external/analytics";
import { getCustomerById } from "@/network/external/customers";
import React, { FC } from "react";

export interface UsersPageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{
    year?: number;
  }>;
}

const UserPage: FC<UsersPageProps> = async ({ searchParams, params }) => {
  const { id } = await params;
  const { year } = await searchParams;

  const [customer, revenue, receipts] = await Promise.all([
    getCustomerById(id),
    findTotalYearRevenue({ customerId: id, year }),
    findTotalYearPayments({ customerId: id, year }),
  ]);

  return (
    <>
      <Title text="Customer Info" goBack={true} />
      <ViewCustomerModule customer={customer} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
        <CustomerInvoiceAnalytics chartData={revenue} />
        <CustomerReceiptsAnalytics chartData={receipts} />
      </div>
    </>
  );
};

export default UserPage;
