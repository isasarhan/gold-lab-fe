import Title from "@/components/common/title";
import BalancesModule from "@/modules/admin/balances";
import { getAllBalances, getBalancesTotal } from "@/network/external/balances";
import { BalancessSort } from "@/types/balance";
import React, { FC } from "react";

export interface BalancesPageProps {
  searchParams: Promise<{ query: string; page: number; sort: BalancessSort }>;
}

const BalancesPage: FC<BalancesPageProps> = async ({ searchParams }) => {
  const { query, page, sort } = await searchParams;

  const [data, total] = await Promise.all([
    getAllBalances({ searchTerm: query, page, sort }),
    getBalancesTotal(),
  ]);

  return (
    <>
      <Title text="All Balances" />
      <BalancesModule data={data} total={total} />
    </>
  );
};

export default BalancesPage;
