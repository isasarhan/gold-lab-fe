"use client";
import Table from "@/components/common/table";
import { customerColumns } from "@/components/columns/customers-columns";
import { cn } from "@/lib/utils";
import { ICustomer } from "@/types/customer";
import { IPaginatedResponse } from "@/types/pagination";
import React, { FC } from "react";

export interface CustomersModuleProps {
  data: IPaginatedResponse<ICustomer>;
  className?: string;
}

const CustomersModule: FC<CustomersModuleProps> = ({ data, className }) => {
  return (
    <div className={cn("flex flex-col gap-3 pb-7", className)}>
      <Table
        data={data.data}
        columns={customerColumns}
        page={data.page}
        pages={data.pages}
        total={data.total}
      />
    </div>
  );
};

export default CustomersModule;
