"use client";
import Table from "@/components/common/table";
import { createUserColumns } from "@/components/columns/users-columns";
import { IUser } from "@/types/user";
import { useRouter } from "next/navigation";
import React, { FC, useMemo } from "react";
import { toast } from "sonner";
import { deleteUser, updateUser } from "@/network/external/users";

export interface UsersModuleProps {
  users: IUser[];
}

const UsersModule: FC<UsersModuleProps> = ({ users = [] }) => {
  const router = useRouter();

  const handleChangePublicity = async (user: IUser) => {
    await updateUser(user._id, { isApproved: !user.isApproved }).then(() => {
      router.refresh();
      toast.success("updated!");
    });
  };

  const handleDelete = async (index: number, value: IUser) => {
    await deleteUser(value._id).then(() => {
      router.refresh();
      toast.success("user deleted!");
    });
  };

  const columns = useMemo(
    () => createUserColumns(handleChangePublicity, handleDelete),
    [],
  );

  return (
    <div className="flex flex-col gap-3 pb-7">
      <Table data={users} columns={columns} />
    </div>
  );
};

export default UsersModule;
