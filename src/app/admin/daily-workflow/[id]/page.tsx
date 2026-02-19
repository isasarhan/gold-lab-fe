import ViewDailyWorkflowModule from "@/modules/admin/daily-workflow/view";
import { getDailyWorkflowById } from "@/network/external/daily-workflow";
import Title from "@/components/common/title";
import React, { FC } from "react";
export interface ViewDailyWorkflowPageProps {
  params: Promise<{ id: string }>;
}

const ViewDailyWorkflowPage: FC<ViewDailyWorkflowPageProps> = async ({
  params,
}) => {
  const { id } = await params;
  const report = await getDailyWorkflowById(id);
  return (
    <>
      <Title text="Daily Report" goBack={true} />
      <ViewDailyWorkflowModule report={report} />
    </>
  );
};

export default ViewDailyWorkflowPage;
