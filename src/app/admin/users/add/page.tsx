import AddUserModule from "@/modules/admin/users/add";
import React, { FC } from "react";

export interface AddUserPageProps {}

const AddUserPage: FC<AddUserPageProps> = async () => {

  return <AddUserModule />;
};

export default AddUserPage;
