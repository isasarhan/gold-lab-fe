"use client";
import { IEmployee } from "@/types/employee";
import Table from "@/components/common/table";
import { employeeColumns } from "@/components/columns/employees-columns";
import React, { FC } from "react";
export interface EmployeesModuleProps {
  data: {
    data: IEmployee[];
    total: number;
    page: number;
    pages: number;
  };
}
const EmployeesModule: FC<EmployeesModuleProps> = ({ data }) => {
  return (
    <div className="flex flex-col gap-3 pb-7">
      <Table data={data.data} columns={employeeColumns} page={data.page} pages={data.pages} total={data.total} />
    </div>
  );
};

export default EmployeesModule;
