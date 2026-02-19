"use client";
import React, { FC } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddUserSchema } from "../validation";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Role } from "@/types/user";
import { addUser } from "@/network/external/users";
import { toast } from "sonner";
import FormInput from "@/components/common/form/input";
import FormSelect from "@/components/common/form/select";
import FormPassword from "@/components/common/form/password";

export interface AddUserModuleProps {}
const AddUserModule: FC<AddUserModuleProps> = () => {
  const form = useForm({
    mode: "onBlur",
    resolver: zodResolver(AddUserSchema),
  });
  const { handleSubmit } = form;
  type UserType = z.infer<typeof AddUserSchema>;

  const onSubmit = async (data: UserType) => {
    try {
      await addUser(data);
      toast.success("User added successfully!");
    } catch (e: any) {
      toast.error(e.message);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Add User</CardTitle>
        <CardDescription>
          Fill in the details to create a new user
        </CardDescription>
      </CardHeader>

      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-3">
          <div className="flex flex-col lg:flex-row lg:items-center w-full gap-4 ">
            <FormSelect
              control={form.control}
              name="role"
              label="Role"
              placeholder="Select Role"
              options={Object.values(Role).map((type) => ({
                label: type,
                value: type,
              }))}
            />

            <FormInput
              control={form.control}
              name="username"
              label="User Name"
              placeholder="Enter user name"
            />
            <FormInput
              control={form.control}
              name="name"
              label="Full Name"
              placeholder="Enter user first name"
            />
          </div>
          <div className="flex flex-col lg:flex-row lg:items-center w-full gap-4">
            <FormInput
              control={form.control}
              name="phone"
              label="Phone"
              placeholder="Enter phone"
            />

            <FormInput
              control={form.control}
              name="email"
              label="Email"
              placeholder="Enter email"
            />
            <FormPassword
              control={form.control}
              name="password"
              title="Password"
              placeholder="Enter password"
            />
          </div>
          <Button type="submit" className="w-full">
            Add
          </Button>
        </CardContent>
      </form>
    </Card>
  );
};

export default AddUserModule;
