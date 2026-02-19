import EmployeeAttendeceUploadModule from '@/modules/admin/employee/attendence/upload';
import Title from '@/components/common/title';
import React, { FC } from 'react';

export interface EmployeeAttendeceUploadPageProps { }

const EmployeeAttendeceUploadPage: FC<EmployeeAttendeceUploadPageProps> = () => {
    return (
        <>
            <Title text="Upload Attendance" goBack={true} />
            <EmployeeAttendeceUploadModule />
        </>
    );
};

export default EmployeeAttendeceUploadPage;