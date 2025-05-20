import Title from '@/components/common/title';
import { getAuth } from '@/lib/auth';
import SuppliersModule from '@/modules/admin/suppliers';
import useSuppliers from '@/services/supplier';
import React, { FC } from 'react';

export interface SuppliersPageProps { }

const SuppliersPage: FC<SuppliersPageProps> = async () => {
    const { token } = await getAuth();

    const { getAll } = useSuppliers({ token })
    const data = await getAll();
    return (
        <>
            <Title text='All Suppliers' />
            <SuppliersModule suppliers={data} />
        </>
    );
};

export default SuppliersPage;