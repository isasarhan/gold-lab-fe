import { getAuth } from '@/lib/auth';
import CustomersModule from '@/modules/admin/customers';
import useCustomers from '@/services/customers';
import React, { FC } from 'react';

export interface CustomersPageProps {
    searchParams: Promise<{ query: string }>
}

const CustomersPage: FC<CustomersPageProps> = async ({ searchParams }) => {
    const { query } = await searchParams
    
    const { token, user } = await getAuth();

    const { getAll } = useCustomers({ token })
    // const data = await getAll({ searchTerm:query });

    const data = await getAll();
    console.log('data', data);
        
  return (
    <CustomersModule customers={data}/>
  );
};

export default CustomersPage;