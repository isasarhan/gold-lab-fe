import Title from "@/components/common/title";
import AddReceiptModule from "@/modules/admin/receipts/add";
import { getAllCustomers } from "@/network/external/customers";
import React, { FC } from "react";

export interface AddRecieptsPageProps {}

const AddRecieptsPage: FC<AddRecieptsPageProps> = async () => {
  const data = await getAllCustomers({ pageSize: 100 });
  return (
    <>
      <Title text="New Receipt" />
      <AddReceiptModule customers={data.data} />
    </>
  );
};

export default AddRecieptsPage;
