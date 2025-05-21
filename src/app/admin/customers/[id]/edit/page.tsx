import Title from '@/components/common/title';
import { getAuth } from '@/lib/auth';
import EditCustomerModule from '@/modules/admin/customers/edit';
import useCustomers from '@/services/customers';
import React, { FC } from 'react';

export interface EditCustomerPageProps {
        params: Promise<{ id: string }>
}

const fetchCustomer = async (id: string) => {
    const { token } = await getAuth();
    const { getById } = useCustomers({ token: token })
    return await getById(id)
}


const EditCustomerPage: FC<EditCustomerPageProps> = async ({ params }) => {
    const { id } = await params;
    const customer = await fetchCustomer(id)
    return (
        <>
            <Title text='Edit Customer' goBack={true}/>
            <EditCustomerModule customer={customer}/>
        </>
    );
};

export default EditCustomerPage;