import Title from '@/components/common/title';
import { getAuth } from '@/lib/auth';
import EditBalanceModule from '@/modules/admin/balances/edit';
import useBalances from '@/services/balances';
import React, { FC } from 'react';

export interface EditBalancePageProps {
  params: Promise<{ id: string }>
}

const fetchBalance = async (id: string) => {
  const { token } = await getAuth();
  const { getById } = useBalances({ token: token })
  return await getById(id)
}


const EditBalancePage: FC<EditBalancePageProps> = async ({ params }) => {
  const { id } = await params;
  const balance = await fetchBalance(id)

  return (
    <>
      <Title text={`Edit Balance for ${balance.customer.name}`} goBack={true} />
      <EditBalanceModule balance={balance} />
    </>
  );
};

export default EditBalancePage;