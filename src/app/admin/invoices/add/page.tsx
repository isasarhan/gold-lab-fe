import Title from "@/components/common/title";
import AddInvoiceModule from "@/modules/admin/invoices/add";
import { getAllCustomers } from "@/network/external/customers";

const AddInvoicePage = async () => {
  const data = await getAllCustomers({ pageSize: 100 });

  return (
    <>
      <Title text="New Invoice" goBack={true} />
      <AddInvoiceModule customers={data.data} />
    </>
  );
};

export default AddInvoicePage;
