import Title from "@/components/common/title";
import { getAuth } from "@/lib/auth";
import SuppliesModule from "@/modules/admin/supplies";
import { getAllSuppliers } from "@/network/external/supplier";
import { getAllSupplies } from "@/network/external/supplies";
import React, { FC } from "react";

export interface SuppliesPageProps {
  searchParams: Promise<{
    query: string;
    supplier: string;
    startDate: string;
    endDate: string;
    page: number;
  }>;
}

const SuppliesPage: FC<SuppliesPageProps> = async ({ searchParams }) => {
  const { query, supplier, startDate, endDate, page } = await searchParams;

  const [suppliers, supplies] = await Promise.all([
    getAllSuppliers({}),
    getAllSupplies({ searchTerm: query, page, supplier, startDate, endDate }),
  ]);

  return (
    <>
      <Title text="All Supplies" />
      <SuppliesModule data={supplies} suppliers={suppliers} />
    </>
  );
};

export default SuppliesPage;
