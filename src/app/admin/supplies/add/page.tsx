import Title from '@/components/common/title';
import { getAuth } from '@/lib/auth';
import AddSupplyModule from '@/modules/admin/supplies/add';
import useSuppliers from '@/services/supplier';
import React, { FC } from 'react';

export interface AddSupplyPageProps { }

const AddSupplyPage: FC<AddSupplyPageProps> = async () => {
    const { token } = await getAuth();

    const { getAll } = useSuppliers({ token })
    const data = await getAll();
    return (
        <>
            <Title text='New Supply' />
            <AddSupplyModule suppliers={data} />
        </>
    );
};

export default AddSupplyPage;