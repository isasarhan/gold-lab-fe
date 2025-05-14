import { getAuth } from '@/lib/auth';
import useInvoices from '@/services/invoices';
import React, { FC } from 'react';
export interface ViewInvoicePageProps {
    params: Promise<{ id: string }>

}

const fetchInvoice = async (id: string) => {
    const { token } = await getAuth();
    const { getById } = useInvoices({ token: token })
    return await getById(id)
}

const ViewInvoicePage: FC<ViewInvoicePageProps> = async ({ params }) => {
    const { id } = await params;
    const invoice = await fetchInvoice(id)
    console.log(invoice);
    
    return (
        <div>
            Hello ViewInvoicePage
        </div>
    );
};

export default ViewInvoicePage;