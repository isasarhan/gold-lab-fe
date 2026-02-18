import Title from "@/components/common/title";
import AddInvoiceModule from "@/modules/admin/invoices/add";
import { getAllCustomers } from "@/network/external/customers";
import type { FC } from "react";

interface AddInvoicePageProps {}

const AddInvoicePage: FC<AddInvoicePageProps> = async () => {
  const data = await getAllCustomers({ pageSize: 100 });

  return (
    <>
      <Title text="New Invoice" goBack={true} />
      <AddInvoiceModule customers={data.data} />
    </>
  );
};

export default AddInvoicePage;
