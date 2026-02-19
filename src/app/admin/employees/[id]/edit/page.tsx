import Title from "@/components/common/title";
import EditEmployeeModule from "@/modules/admin/employee/edit";
import { getEmployeeById } from "@/network/external/employees";

import React, { FC } from "react";

export interface EditEmployeePageProps {
  params: Promise<{ id: string }>;
}

const EditEmployeePage: FC<EditEmployeePageProps> = async ({ params }) => {
  const { id } = await params;
  const employee = await getEmployeeById(id);

  return (
    <>
      <Title text="Edit Employee" goBack={true} />
      <EditEmployeeModule employee={employee} />
    </>
  );
};

export default EditEmployeePage;
