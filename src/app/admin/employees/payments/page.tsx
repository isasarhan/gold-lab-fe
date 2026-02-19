import Title from "@/components/common/title";
import EmployeePaymentsModule from "@/modules/admin/salary-payments";
import { getAllSalaryPayments } from "@/network/external/salary-payment";
import React, { FC } from "react";

export interface EmployeePaymentsPageProps {
  searchParams: Promise<{ year: string; month: string }>;
}

const fetchReport = async (
  year: string = new Date().getFullYear().toString(),
  month: string = new Date().getMonth().toString(),
) => {
  return await getAllSalaryPayments(year, month);
};

const EmployeePaymentsPage: FC<EmployeePaymentsPageProps> = async ({
  searchParams,
}) => {
  const { year, month } = await searchParams;
  const report = await fetchReport(year, month);

  return (
    <>
      <Title
        text="Salary Payments"
        buttonText="Add Payment"
        url="/admin/employees/payments/add"
      />
      <EmployeePaymentsModule reports={report} />
    </>
  );
};

export default EmployeePaymentsPage;
