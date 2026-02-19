"use client";
import { IOrder } from "@/types/invoice";
import React, { FC, useMemo } from "react";
import Table from "@/components/common/table";
import { createOrderItemColumns } from "@/components/columns/order-items-columns";

export interface OrderTableProps {
  orders: IOrder[];
  onEdit(value: IOrder, id: number): void;
  onDelete(id: number, value?: IOrder): void;
}

const OrderTable: FC<OrderTableProps> = ({ orders, onEdit, onDelete }) => {
  const columns = useMemo(
    () => createOrderItemColumns(onEdit, onDelete),
    [onEdit, onDelete],
  );

  return <Table columns={columns} data={orders} />;
};

export default OrderTable;
