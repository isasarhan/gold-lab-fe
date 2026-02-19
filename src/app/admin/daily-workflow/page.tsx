import Title from "@/components/common/title";
import DailyWorkFLowModule from "@/modules/admin/daily-workflow";
import { getDailyWorkflowByDate } from "@/network/external/daily-workflow";
import React, { FC } from "react";

export interface DailyWorkflowPageProps {
  searchParams: Promise<{ date: string }>;
}

const DailyWorkflowPage: FC<DailyWorkflowPageProps> = async ({
  searchParams,
}) => {
  const { date } = await searchParams;
  const report = await getDailyWorkflowByDate(date);

  return (
    <>
      <Title
        text="All DailyReports"
        buttonText="Add Report"
        url="/admin/daily-workflow/add"
      />
      <DailyWorkFLowModule report={report} />
    </>
  );
};

export default DailyWorkflowPage;
