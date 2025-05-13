import Title from '@/components/common/title';
import { getAuth } from '@/lib/auth';
import CustomersModule from '@/modules/admin/customers';
import useCustomers from '@/services/customers';
import React, { FC } from 'react';

export interface CustomersPageProps {
  searchParams: Promise<{
    query: string
    page: number;
  }>
}

const CustomersPage: FC<CustomersPageProps> = async ({ searchParams }) => {
  const { query,page } = await searchParams

  const { token } = await getAuth();

  const { getAll } = useCustomers({ token })
  const data = await getAll({ searchTerm: query,page });

  return (
    <>
      <Title text='All Customers'/>
      <CustomersModule data={data} />
    </>
  );
};

export default CustomersPage;