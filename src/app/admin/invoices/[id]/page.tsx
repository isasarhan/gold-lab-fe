import ViewInvoiceModule from "@/modules/admin/invoices/view";
import { getInvoiceById } from "@/network/external/invoices";
import Title from "@/components/common/title";
import React, { FC } from "react";
export interface ViewInvoicePageProps {
  params: Promise<{ id: string }>;
}

const ViewInvoicePage: FC<ViewInvoicePageProps> = async ({ params }) => {
  const { id } = await params;
  const invoice = await getInvoiceById(id);

  return (
    <>
      <Title text="Invoice Details" goBack={true} />
      <ViewInvoiceModule invoice={invoice} />
    </>
  );
};

export default ViewInvoicePage;
