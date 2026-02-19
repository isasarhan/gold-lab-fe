import Title from "@/components/common/title";
import ReceiptsModule from "@/modules/admin/receipts";
import { getAllCustomers } from "@/network/external/customers";
import { getAllReceipts } from "@/network/external/receipts";

import React, { FC } from "react";

export interface ReceiptsPropsPage {
  searchParams: Promise<{
    query: string;
    customer: string;
    startDate: string;
    endDate: string;
    page: number;
  }>;
}

const ReceiptsPage: FC<ReceiptsPropsPage> = async ({ searchParams }) => {
  const { query, customer, startDate, endDate, page } = await searchParams;

  const [customers, receipts] = await Promise.all([
    getAllCustomers({ pageSize: 100 }),
    getAllReceipts({ searchTerm: query, page, customer, startDate, endDate }),
  ]);

  return (
    <>
      <Title
        text="All Receipts"
        buttonText="Add Receipts"
        url="/admin/receipts/add"
      />
      <ReceiptsModule data={receipts} customers={customers.data} />
    </>
  );
};

export default ReceiptsPage;
