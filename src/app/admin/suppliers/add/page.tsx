import Title from '@/components/common/title';
import AddSupplierModule from '@/modules/admin/suppliers/add';
import React, { FC } from 'react';

export interface AddSupplierPropsPage { }

const AddSupplierPage: FC<AddSupplierPropsPage> = () => {
    return (
        <>
            <Title text='New Supplier' />
            <AddSupplierModule />
        </>
    );
};

export default AddSupplierPage;