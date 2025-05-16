import Title from '@/components/common/title';
import { getAuth } from '@/lib/auth';
import EditEmployeeModule from '@/modules/admin/employee/edit';
import useEmployees from '@/services/employees';
import React, { FC } from 'react';

export interface EditEmployeePageProps {
    params: Promise<{ id: string }>
}

const fetchEmployee = async (id: string) => {
    const { token } = await getAuth();
    const { getById } = useEmployees({ token: token })
    return await getById(id)
}


const EditEmployeePage: FC<EditEmployeePageProps> = async ({ params }) => {
    const { id } = await params
    const employee = await fetchEmployee(id)

  return (
        <>
            <Title text='Edit Employee'/>
            <EditEmployeeModule employee={employee}/>
        </>
    );
};

export default EditEmployeePage;