import Title from '@/components/common/title';
import { getAuth } from '@/lib/auth';
import EditSupplierModule from '@/modules/admin/suppliers/edit';
import useSuppliers from '@/services/supplier';

import React, { FC } from 'react';

export interface EditSupplierPageProps {
        params: Promise<{ id: string }>
}

const fetchSupplier = async (id: string) => {
    const { token } = await getAuth();
    const { getById } = useSuppliers({ token: token })
    return await getById(id)
}


const EditSupplierPage: FC<EditSupplierPageProps> = async ({ params }) => {
    const { id } = await params;
    const supplier = await fetchSupplier(id)
    return (
        <>
            <Title text='Edit Supplier'/>
            <EditSupplierModule supplier={supplier}/>
        </>
    );
};

export default EditSupplierPage;