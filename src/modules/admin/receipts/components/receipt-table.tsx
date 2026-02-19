"use client";
import React, { FC, useMemo } from "react";
import Table from "@/components/common/table";
import { IِAddReceipt } from "@/types/receipts";
import { createReceiptItemColumns } from "@/components/columns/receipt-items-columns";

export interface ReceiptTableProps {
  receipts: IِAddReceipt[];
  onEdit(value: IِAddReceipt, id: number): void;
  onDelete(id: number, value?: IِAddReceipt): void;
}

const ReceiptTable: FC<ReceiptTableProps> = ({
  receipts,
  onEdit,
  onDelete,
}) => {
  const columns = useMemo(
    () => createReceiptItemColumns(onEdit, onDelete),
    [onEdit, onDelete],
  );

  return <Table columns={columns} data={receipts} />;
};

export default ReceiptTable;
