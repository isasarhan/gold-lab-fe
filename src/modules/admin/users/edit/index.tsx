"use client";
import FormInput from "@/components/common/form/input";
import FormSelect from "@/components/common/form/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { updateUser } from "@/network/external/users";
import { IUser, Role } from "@/types/user";
import React, { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export interface EditUserModuleProps {
  user: IUser;
}

const EditUserModule: FC<EditUserModuleProps> = ({ user }) => {
  const form = useForm({
    mode: "onBlur",
  });
  const { handleSubmit } = form;

  useEffect(() => {
    form.reset(user);
  }, [user]);

  const onSubmit = async (data: any) => {
    try {
      const { role, email, name, phone, username } = data;
      await updateUser(user._id!, { role, email, name, phone, username });
      toast.success("User updated successfully!");
    } catch (e: any) {
      toast.error(e.message);
    }
  };

  return (
    <Card>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-3">
            <div className="flex gap-4 items-center w-full ">
              <FormSelect
                control={form.control}
                name="role"
                label="Role"
                defaultValue={user.role}
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
            </div>
            <div className="flex flex-col lg:flex-row items-center w-full gap-4 ">
              <FormInput
                control={form.control}
                name="name"
                label="Full Name"
                placeholder="Enter user first name"
              />
            </div>
            <div className="flex flex-col lg:flex-row items-center w-full gap-4">
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
            </div>
            <Button type="submit" className="w-full">
              Edit
            </Button>
          </CardContent>
        </form>
      </Form>
    </Card>
  );
};

export default EditUserModule;
