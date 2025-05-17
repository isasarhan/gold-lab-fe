import Title from '@/components/common/title';
import { getAuth } from '@/lib/auth';
import AddPaymentModule from '@/modules/admin/payments/add';
import useSuppliers from '@/services/supplier';
import React, { FC } from 'react';

export interface AddPaymentPageProps { }

const AddPaymentPage: FC<AddPaymentPageProps> = async () => {
    const { token } = await getAuth();

    const { getAll } = useSuppliers({ token })
    const data = await getAll();
    return (
        <>
            <Title text='New Payment' />
            <AddPaymentModule suppliers={data} />
        </>
    );
};

export default AddPaymentPage;