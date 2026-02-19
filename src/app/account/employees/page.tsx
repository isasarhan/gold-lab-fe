import Title from "@/components/common/title";
import EmployeesModule from "@/modules/admin/employee";
import { getAllEmployees } from "@/network/external/employees";
import React, { FC } from "react";
export interface EmployeesPageProps {
  searchParams: Promise<{
    query: string;
    page: number;
  }>;
}
const EmployeesPage: FC<EmployeesPageProps> = async ({ searchParams }) => {
  const { query, page } = await searchParams;

  const data = await getAllEmployees({ searchTerm: query, page });
  return (
    <>
      <Title text="All Employees" />
      <EmployeesModule data={data} />
    </>
  );
};

export default EmployeesPage;
