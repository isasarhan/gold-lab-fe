import Title from '@/components/common/title';
import { getAuth } from '@/lib/auth';
import AddInvoiceModule from '@/modules/admin/invoices/add';
import useCustomers from '@/services/customers';
import type { FC } from 'react';

interface AddInvoicePageProps { }

const AddInvoicePage: FC<AddInvoicePageProps> = async () => {
    const { token } = await getAuth();

    const { getAll } = useCustomers({ token })
    const data = await getAll();

    return (
        <>
            <Title text='New Invoice' goBack={true}/>
            <AddInvoiceModule customers={data.data} />
        </>
    );
}

export default AddInvoicePage;
