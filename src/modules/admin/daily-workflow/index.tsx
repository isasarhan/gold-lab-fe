"use client";
import { IDailyWorkflow } from "@/types/daily-workflow";
import React, { FC } from "react";
import DailyReportFilter from "./components/report-filter";
import { Card, CardContent } from "@/components/ui/card";
import { dateFormatter } from "@/lib/dateFormatter";
import Link from "next/link";
import { Pen } from "lucide-react";
import { Button } from "@/components/ui/button";
import TableComp from "@/components/common/table";
import { dailyWorkflowColumns } from "@/components/columns/daily-workflow-columns";

export interface DailyWorkFLowModuleProps {
  report?: IDailyWorkflow;
}

const DailyWorkFLowModule: FC<DailyWorkFLowModuleProps> = ({ report }) => {
  return (
    <div className="flex flex-col gap-5">
      <DailyReportFilter />
      <Card className="w-full shadow-md">
        <CardContent className="p-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold mb-4">
              Report Balances – {dateFormatter(report?.date?.toString() || "")}
            </h2>
            <span>
              <Link href={`/admin/daily-workflow/${report?._id}`}>
                <Button variant={"default"} size={"icon"}>
                  <Pen />
                </Button>
              </Link>
            </span>
          </div>
          <TableComp
            data={report?.balances ?? []}
            columns={dailyWorkflowColumns}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default DailyWorkFLowModule;
