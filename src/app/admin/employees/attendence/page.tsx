import AttendenceModule from '@/modules/admin/employee/attendence';
import React, { FC } from 'react';

export interface AttendencePageProps {}

const AttendencePage: FC<AttendencePageProps> = () => {
  return (
    <AttendenceModule/>
  );
};

export default AttendencePage;