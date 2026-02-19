import Title from "@/components/common/title";
import AddPaymentModule from "@/modules/admin/payments/add";
import { getAllSuppliers } from "@/network/external/supplier";
import React, { FC } from "react";

export interface AddPaymentPageProps {}

const AddPaymentPage: FC<AddPaymentPageProps> = async () => {
  const data = await getAllSuppliers();
  return (
    <>
      <Title text="New Payment" />
      <AddPaymentModule suppliers={data} />
    </>
  );
};

export default AddPaymentPage;
