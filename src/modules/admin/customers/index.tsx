import Table, { Column } from "@/components/common/table";
import { cn } from "@/lib/utils";
import { ICustomer } from "@/types/customer";
import { IPaginatedResponse } from "@/types/pagination";
import { Eye, Pen } from "lucide-react";
import Link from "next/link";
import React, { FC } from "react";
export interface CustomersModuleProps {
  data: IPaginatedResponse<ICustomer>;
  className?: string;
}
const CustomersModule: FC<CustomersModuleProps> = ({ data, className }) => {
  const column: Column[] = [
    {
      label: "Full Name",
      value: "name",
    },
    {
      label: "Email",
      value: "email",
    },
    {
      label: "Phone",
      value: "phone",
    },
    {
      label: "Location",
      value: "location",
    },
    {
      label: "Type",
      value: "type",
    },
    {
      label: "Edit",
      render: (value: ICustomer) => (
        <div className="flex justify-center items-center w-full">
          <Link href={`/admin/customers/${value._id}/edit`}>
            <Pen size={20} />{" "}
          </Link>
        </div>
      ),
    },
    {
      label: "View More",
      value: "_id",
      render: (value: ICustomer) => (
        <div className="flex justify-center items-center w-full">
          <Link href={`/admin/customers/${value._id}`}>
            <Eye size={20} />{" "}
          </Link>
        </div>
      ),
    },
  ];

  return (
    <div className={cn("flex flex-col gap-3 pb-7", className)}>
      <Table
        data={data.data}
        columns={column}
        page={data.page}
        pages={data.pages}
        total={data.total}
      />
    </div>
  );
};

export default CustomersModule;
