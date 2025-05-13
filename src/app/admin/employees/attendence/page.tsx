import { getAuth } from '@/lib/auth';
import AttendenceModule from '@/modules/admin/employee/attendence';
import useAttendences from '@/services/attendence';
import useEmployees from '@/services/employees';
import React, { FC } from 'react';

export interface AttendencePageProps {
    searchParams: Promise<{
        query: string, employee: string, month: number, year: string, page: number;
    }>
}

const AttendencePage: FC<AttendencePageProps> = async ({ searchParams }) => {
    const { query, month, employee, year, page } = await searchParams

    const { token } = await getAuth();

    const { getAll: getAllEmployees } = useEmployees({ token })
    const { getAll: getAttendences } = useAttendences({ token })
    const [employees, attendences] = await Promise.all([getAllEmployees(), getAttendences({ searchTerm: query, page, month, employee, year })])
    return (
        <AttendenceModule data={attendences} employees={employees} />
    );
};

export default AttendencePage;