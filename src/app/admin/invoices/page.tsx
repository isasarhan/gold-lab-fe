import Title from "@/components/common/title";
import InvoicesModule from "@/modules/admin/invoices";
import { getAllCustomers } from "@/network/external/customers";
import { getAllInvoices } from "@/network/external/invoices";
import React, { FC } from "react";

export interface InvoicesPageProps {
  searchParams: Promise<{
    query: string;
    customer: string;
    startDate: string;
    endDate: string;
    page: number;
  }>;
}

const InvoicesPage: FC<InvoicesPageProps> = async ({ searchParams }) => {
  const { query, customer, startDate, endDate, page } = await searchParams;

  // const data = await getAll({ searchTerm:query });
  const [customers, invoices] = await Promise.all([
    getAllCustomers({ pageSize: 100 }),
    getAllInvoices({ searchTerm: query, page, customer, startDate, endDate }),
  ]);

  return (
    <>
      <Title
        text="All Invoices"
        buttonText="Add Invoice"
        url="/admin/invoices/add"
      />
      <InvoicesModule data={invoices} customers={customers.data} />
    </>
  );
};

export default InvoicesPage;
