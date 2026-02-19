import Title from "@/components/common/title";
import PaymentsModule from "@/modules/admin/payments";
import { getAllSuppliers } from "@/network/external/supplier";
import { getAllSupplyPayments } from "@/network/external/supply-payments";
import React, { FC } from "react";

export interface PaymentsPageProps {
  searchParams: Promise<{
    query: string;
    supplier: string;
    startDate: string;
    endDate: string;
    page: number;
  }>;
}

const PaymentsPage: FC<PaymentsPageProps> = async ({ searchParams }) => {
  const { query, supplier, startDate, endDate, page } = await searchParams;

  const [suppliers, payments] = await Promise.all([
    getAllSuppliers({}),
    getAllSupplyPayments({
      searchTerm: query,
      page,
      supplier,
      startDate,
      endDate,
    }),
  ]);

  return (
    <>
      <Title
        text="All Payments"
        buttonText="Add Payment"
        url="/admin/payments/add"
      />
      <PaymentsModule data={payments} suppliers={suppliers} />
    </>
  );
};

export default PaymentsPage;
