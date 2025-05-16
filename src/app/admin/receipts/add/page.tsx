import Title from '@/components/common/title';
import { getAuth } from '@/lib/auth';
import AddReceiptModule from '@/modules/admin/receipts/add';
import useCustomers from '@/services/customers';
import React, { FC } from 'react';

export interface AddRecieptsPageProps { }

const AddRecieptsPage: FC<AddRecieptsPageProps> = async () => {
    const { token } = await getAuth();

    const { getAll } = useCustomers({ token })
    const data = await getAll();
    return (
        <>
            <Title text='New Receipt' />
            <AddReceiptModule customers={data.data} />
        </>
    );
};

export default AddRecieptsPage;