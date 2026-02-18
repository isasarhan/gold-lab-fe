import Title from "@/components/common/title";
import CustomersModule from "@/modules/admin/customers";
import { getAllCustomers } from "@/network/external/customers";
import { ISearch } from "@/types/filter";
import React, { FC } from "react";

export interface CustomersPageProps {
  searchParams: Promise<ISearch>;
}

const CustomersPage: FC<CustomersPageProps> = async ({ searchParams }) => {
  const { query, page } = await searchParams;

  const data = await getAllCustomers({ searchTerm: query, page });

  return (
    <>
      <Title
        text="All Customers"
        buttonText="Add Customer"
        url="/admin/customers/add"
      />
      <CustomersModule data={data} />
    </>
  );
};

export default CustomersPage;
