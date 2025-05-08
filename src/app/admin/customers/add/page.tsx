import AddCustomerModule from "@/modules/admin/customers/add";
import React, { FC } from "react";

export interface AddUserPageProps {}

const AddUserPage: FC<AddUserPageProps> = async () => {

  return <AddCustomerModule />;
};

export default AddUserPage;
