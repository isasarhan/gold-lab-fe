import Title from "@/components/common/title";
import UsersModule from "@/modules/admin/users";
import { getAllUsers } from "@/network/external/users";
import React, { FC } from "react";

export interface UsersPageProps {
  searchParams: Promise<{ query: string }>;
}

const UsersPage: FC<UsersPageProps> = async ({ searchParams }) => {
  const { query } = await searchParams;

  const data = await getAllUsers({ searchTerm: query });

  return (
    <>
      <Title text="All Users" />
      <UsersModule users={data} />
    </>
  );
};

export default UsersPage;
