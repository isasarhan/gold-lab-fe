import Title from "@/components/common/title";
import AddUserModule from "@/modules/admin/users/add";
import React, { FC } from "react";

export interface AddUserPageProps { }

const AddUserPage: FC<AddUserPageProps> = async () => {

  return <>
    <Title text='New User' />
    <AddUserModule />;
  </>

};

export default AddUserPage;
