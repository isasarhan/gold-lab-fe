import ViewUserModule from "@/modules/admin/users/view";
import { getUserById } from "@/network/external/users";
import Title from "@/components/common/title";
import React from "react";

const UserPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const user = await getUserById(id);

  return (
    <>
      <Title text="User Details" goBack={true} />
      <ViewUserModule user={user} />
    </>
  );
};

export default UserPage;
