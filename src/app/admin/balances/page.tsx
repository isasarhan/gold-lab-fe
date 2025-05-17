import Title from '@/components/common/title';
import { getAuth } from '@/lib/auth';
import BalancesModule from '@/modules/admin/balances';
import useBalances from '@/services/balances';
import React, { FC } from 'react';

export interface BalancesPageProps {
  searchParams: Promise<{ query: string }>
}

const BalancesPage: FC<BalancesPageProps> = async ({ searchParams }) => {
  const { query } = await searchParams

  const { token } = await getAuth();

  const { getAll, getTotal } = useBalances({ token })

  const [data, total] = await Promise.all([getAll({ searchTerm:query }), getTotal()]);

  return (
    <>
      <Title text='All Balances' />
      <BalancesModule balaces={data} total={total} />
    </>
  );
};

export default BalancesPage;