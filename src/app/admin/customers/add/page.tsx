import Title from "@/components/common/title";
import AddCustomerModule from "@/modules/admin/customers/add";
import React, { FC } from "react";

export interface AddCustomerPageProps {}

const AddCustomerPage: FC<AddCustomerPageProps> = async () => {

  return <>
      <Title text='New Customer' />

  <AddCustomerModule />;
  </>
};

export default AddCustomerPage;
