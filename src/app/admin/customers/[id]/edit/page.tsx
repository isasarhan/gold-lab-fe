import Title from "@/components/common/title";
import EditCustomerModule from "@/modules/admin/customers/edit";
import { getCustomerById } from "@/network/external/customers";
import React, { FC } from "react";

export interface EditCustomerPageProps {
  params: Promise<{ id: string }>;
}

const EditCustomerPage: FC<EditCustomerPageProps> = async ({ params }) => {
  const { id } = await params;
  const customer = await getCustomerById(id);
  return (
    <>
      <Title text="Edit Customer" goBack={true} />
      <EditCustomerModule customer={customer} />
    </>
  );
};

export default EditCustomerPage;
