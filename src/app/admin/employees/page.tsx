import Title from '@/components/common/title';
import { getAuth } from '@/lib/auth';
import EmployeesModule from '@/modules/admin/employee';
import useEmployees from '@/services/employees';
import React, { FC } from 'react';
export interface EmployeesPageProps {
    height: number;
}
const EmployeesPage: FC<EmployeesPageProps> = async () => {
    const { token } = await getAuth();

    const { getAll } = useEmployees({ token })
    const data = await getAll()
    return (
    <>
        <Title text='All Emplloyees' />
        <EmployeesModule employees={data} />
    </>
    );
};

export default EmployeesPage;