import AddInvoiceModule from '@/modules/admin/invoices/add';
import type { FC } from 'react';

interface AddInvoicePageProps {}

const AddInvoicePage: FC<AddInvoicePageProps> = () => {
    return (
        <>
            <AddInvoiceModule/>
        </>
    );
}

export default AddInvoicePage;
