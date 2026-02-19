"use client";
import React, { FC, useMemo } from "react";
import Table from "@/components/common/table";
import { SupplyValues } from "@/components/form/SupplyForm/validation";
import { createSupplyItemColumns } from "@/components/columns/supply-items-columns";

export interface SuppliesTableProps {
  supplies: SupplyValues[];
  onEdit(value: SupplyValues, id: number): void;
  onDelete(id: number, value?: SupplyValues): void;
}

const SuppliesTable: FC<SuppliesTableProps> = ({
  supplies,
  onEdit,
  onDelete,
}) => {
  const columns = useMemo(
    () => createSupplyItemColumns(onEdit, onDelete),
    [onEdit, onDelete],
  );

  return <Table columns={columns} data={supplies} />;
};

export default SuppliesTable;
