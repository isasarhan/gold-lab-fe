import { getAuth } from '@/lib/auth';
import ViewDailyWorkflowModule from '@/modules/admin/daily-workflow/view';
import useDailyWorkflow from '@/services/daily-workflow';
import React, { FC } from 'react';
export interface ViewDailyWorkflowPageProps {
    params: Promise<{ id: string }>,
}

const fetchReport = async (id: string) => {
    const { token } = await getAuth();
    const { getById } = useDailyWorkflow({ token: token })
    return await getById(id)
}

const ViewDailyWorkflowPage: FC<ViewDailyWorkflowPageProps> = async ({ params }) => {
    const { id } = await params;
    const report = await fetchReport(id)
    return (
        <ViewDailyWorkflowModule report={report}/>
    );
};

export default ViewDailyWorkflowPage;