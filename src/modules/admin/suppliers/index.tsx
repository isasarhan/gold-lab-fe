"use client";
import { ISupplier } from "@/types/supplier";
import Table from "@/components/common/table";
import { supplierColumns } from "@/components/columns/suppliers-columns";
import React, { FC } from "react";

export interface SuppliersModuleProps {
  suppliers: ISupplier[];
}

const SuppliersModule: FC<SuppliersModuleProps> = ({ suppliers }) => {
  return (
    <div className="flex flex-col gap-3 pb-7">
      <Table data={suppliers} columns={supplierColumns} />
    </div>
  );
};

export default SuppliersModule;
