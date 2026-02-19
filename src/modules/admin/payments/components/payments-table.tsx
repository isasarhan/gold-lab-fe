"use client";
import React, { FC, useMemo } from "react";
import Table from "@/components/common/table";
import { ISupplyPayment } from "@/types/supply-payments";
import { createPaymentItemColumns } from "@/components/columns/payment-items-columns";

export interface PaymentsTableProps {
  payments: ISupplyPayment[];
  onEdit(value: ISupplyPayment, id: number): void;
  onDelete(id: number, value?: ISupplyPayment): void;
}

const PaymentsTable: FC<PaymentsTableProps> = ({
  payments,
  onEdit,
  onDelete,
}) => {
  const columns = useMemo(
    () => createPaymentItemColumns(onEdit, onDelete),
    [onEdit, onDelete],
  );

  return <Table columns={columns} data={payments} />;
};

export default PaymentsTable;
