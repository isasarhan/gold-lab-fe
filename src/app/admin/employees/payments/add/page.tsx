import Title from '@/components/common/title';
import { getAuth } from '@/lib/auth';
import AddSalaryPaymentModule from '@/modules/admin/salary-payments/add';
import useEmployees from '@/services/employees';
import React, { FC } from 'react';

export interface AddSalaryPaymentPageProps { }

const AddSalaryPaymentPage: FC<AddSalaryPaymentPageProps> = async () => {
    const { token } = await getAuth();

    const { getAll: getAllEmployees } = useEmployees({ token })

    const employees = await getAllEmployees()
    return (
        <>
            <Title text='Add Salary Payments' goBack={true} />
            <AddSalaryPaymentModule employees={employees.data}/>
        </>
    );
};

export default AddSalaryPaymentPage;