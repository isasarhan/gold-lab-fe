import Title from "@/components/common/title";
import EditUserModule from "@/modules/admin/users/edit";
import { getUserById } from "@/network/external/users";
import React, { FC } from "react";

export interface EditUserPageProps {
  params: Promise<{ id: string }>;
}

const EditUserPage: FC<EditUserPageProps> = async ({ params }) => {
  const { id } = await params;
  const user = await getUserById(id);
  return (
    <>
      <Title text="Edit User" goBack={true} />
      <EditUserModule user={user} />
    </>
  );
};

export default EditUserPage;
