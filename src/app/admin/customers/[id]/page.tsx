import Title from '@/components/common/title';
import { getAuth } from '@/lib/auth';
import ViewCustomerModule from '@/modules/admin/customers/view';
import useCustomers from '@/services/customers';
import React from 'react';


const fetchCustomer = async (id: string) => {
    const { token } = await getAuth();
    const { getById } = useCustomers({ token: token })
    return await getById(id)
}

const UserPage = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    const customer = await fetchCustomer(id)

    return (
        <>
            <Title text='Customer Info' goBack={true} />
            <ViewCustomerModule customer={customer} />
        </>
    );
};

export default UserPage;