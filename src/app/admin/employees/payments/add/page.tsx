import Title from "@/components/common/title";
import AddSalaryPaymentModule from "@/modules/admin/salary-payments/add";
import { getAllEmployees } from "@/network/external/employees";

const AddSalaryPaymentPage = async () => {
  const employees = await getAllEmployees();
  return (
    <>
      <Title text="Add Salary Payments" goBack={true} />
      <AddSalaryPaymentModule employees={employees.data} />
    </>
  );
};

export default AddSalaryPaymentPage;
