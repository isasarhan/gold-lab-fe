import Title from "@/components/common/title";
import AddSalaryPaymentModule from "@/modules/admin/salary-payments/add";
import { getAllEmployees } from "@/network/external/employees";

import React, { FC } from "react";

export interface AddSalaryPaymentPageProps {}

const AddSalaryPaymentPage: FC<AddSalaryPaymentPageProps> = async () => {
  const employees = await getAllEmployees();
  return (
    <>
      <Title text="Add Salary Payments" goBack={true} />
      <AddSalaryPaymentModule employees={employees.data} />
    </>
  );
};

export default AddSalaryPaymentPage;
