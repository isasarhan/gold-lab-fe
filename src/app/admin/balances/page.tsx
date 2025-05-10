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

  const { token, user } = await getAuth();

  const { getAll, getTotal } = useBalances({ token })
  // const data = await getAll({ searchTerm:query });

  const [data, total] = await Promise.all([getAll(), getTotal()]);

  return (
    <>
      <Title text='All Balances' />
      <BalancesModule balaces={data} total={total} />
    </>
  );
};

export default BalancesPage;