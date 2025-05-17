import Title from '@/components/common/title';
import { getAuth } from '@/lib/auth';
import SuppliesModule from '@/modules/admin/supplies';
import useSuppliers from '@/services/supplier';
import useSupplies from '@/services/supplies';
import React, { FC } from 'react';

export interface SuppliesPageProps {
    searchParams: Promise<{
        query: string, supplier: string, startDate: string, endDate: string, page: number;
    }>
}

const SuppliesPage: FC<SuppliesPageProps> = async ({ searchParams }) => {
    const { query, supplier, startDate, endDate, page } = await searchParams
    
    const { token } = await getAuth();

    const { getAll: getSupplies } = useSupplies({ token })
    const { getAll: getSuppliers } = useSuppliers({ token })
    const [suppliers, supplies] = await Promise.all(
        [getSuppliers({}), getSupplies({ searchTerm: query, page, supplier, startDate, endDate })])        

    return (
        <>
            <Title text='All Supplies' buttonText='Add Supply' url='/admin/supplies/add' />
            <SuppliesModule data={supplies} suppliers={suppliers} />
        </>
    );
};

export default SuppliesPage;