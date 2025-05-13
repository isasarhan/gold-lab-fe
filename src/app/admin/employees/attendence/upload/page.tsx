import EmployeeAttendeceUploadModule from '@/modules/admin/employee/attendence/upload';
import React, { FC } from 'react';

export interface EmployeeAttendeceUploadPageProps { }

const EmployeeAttendeceUploadPage: FC<EmployeeAttendeceUploadPageProps> = () => {
    return (
        <EmployeeAttendeceUploadModule />
    );
};

export default EmployeeAttendeceUploadPage;