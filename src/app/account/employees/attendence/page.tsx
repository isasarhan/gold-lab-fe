import AttendenceModule from "@/modules/admin/employee/attendence";
import { getAllAttendences } from "@/network/external/attendences";
import { getAllEmployees } from "@/network/external/employees";

import React, { FC } from "react";

export interface AttendencePageProps {
  searchParams: Promise<{
    query: string;
    employee: string;
    month: number;
    year: string;
    page: number;
  }>;
}

const AttendencePage: FC<AttendencePageProps> = async ({ searchParams }) => {
  const { query, month, employee, year, page } = await searchParams;

  const [employees, attendences] = await Promise.all([
    getAllEmployees(),
    getAllAttendences({ searchTerm: query, page, month, employee, year }),
  ]);
  return <AttendenceModule data={attendences} employees={employees.data} />;
};

export default AttendencePage;
