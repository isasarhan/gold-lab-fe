import Title from '@/components/common/title';
import { getAuth } from '@/lib/auth';
import BalancesModule from '@/modules/admin/balances';
import useBalances from '@/services/balances';
import { BalancessSort } from '@/types/balance';
import React, { FC } from 'react';

export interface BalancesPageProps {
  searchParams: Promise<{ query: string, page: number; sort: BalancessSort }>
}

const BalancesPage: FC<BalancesPageProps> = async ({ searchParams }) => {
  const { query, page, sort } = await searchParams

  const { token } = await getAuth();

  const { getAll, getTotal } = useBalances({ token })

  const [data, total] = await Promise.all([getAll({ searchTerm: query, page, sort }), getTotal()]);

  return (
    <>
      <Title text='All Balances' />
      <BalancesModule data={data} total={total} />
    </>
  );
};

export default BalancesPage;