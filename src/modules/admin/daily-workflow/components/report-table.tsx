"use client";
import { IReport } from "@/types/daily-workflow";
import React, { FC, useMemo } from "react";
import Table from "@/components/common/table";
import { createReportItemColumns } from "@/components/columns/report-items-columns";

export interface ReportTableProps {
  reports: IReport[];
  onEdit(value: IReport, id: number): void;
  onDelete(id: number, value?: IReport): void;
}

const ReportTable: FC<ReportTableProps> = ({ reports, onEdit, onDelete }) => {
  const columns = useMemo(
    () => createReportItemColumns(onEdit, onDelete),
    [onEdit, onDelete],
  );

  return <Table columns={columns} data={reports} />;
};

export default ReportTable;
