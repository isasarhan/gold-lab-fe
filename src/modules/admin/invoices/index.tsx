"use client";
import Table from "@/components/common/table";
import { createInvoiceColumns } from "@/components/columns/invoices-columns";
import { deleteInvoice } from "@/network/external/invoices";
import { ICustomer } from "@/types/customer";
import { IInvoice, IِAddInvoice } from "@/types/invoice";
import { useRouter } from "next/navigation";
import React, { FC, useMemo } from "react";
import { toast } from "sonner";
import CustomerDatesfilter from "@/components/common/customer-dates-filters";

export interface InvoicesModuleProps {
  customers: ICustomer[];

  data: {
    data: IِAddInvoice[];
    total: number;
    page: number;
    pages: number;
  };
}

const InvoicesModule: FC<InvoicesModuleProps> = ({ data, customers }) => {
  const router = useRouter();

  const handleDelete = async (item: IInvoice) => {
    try {
      await deleteInvoice(item?._id).then(() => {
        toast.success("invoice removed successfully!");
        router.refresh();
      });
    } catch (e: any) {
      toast.error(e.message);
    }
  };

  const columns = useMemo(() => createInvoiceColumns(handleDelete), []);

  return (
    <div className="flex flex-col gap-3 pb-7">
      <CustomerDatesfilter customers={customers} />
      <Table
        data={data.data}
        columns={columns}
        page={data.page}
        pages={data.pages}
        total={data.total}
      />
    </div>
  );
};

export default InvoicesModule;
