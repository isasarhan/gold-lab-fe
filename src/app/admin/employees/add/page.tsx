import Title from '@/components/common/title';
import AddEmployeeModule from '@/modules/admin/employee/add';
import React, { FC } from 'react';

export interface AddEmployeePageProps { }

const AddEmployeePage: FC<AddEmployeePageProps> = () => {
    return (
        <>
            <Title text='New Employee' />
            <AddEmployeeModule />
        </>
    )

};

export default AddEmployeePage;