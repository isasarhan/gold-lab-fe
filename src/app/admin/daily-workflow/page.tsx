import Title from '@/components/common/title';
import { getAuth } from '@/lib/auth';
import DailyWorkFLowModule from '@/modules/admin/daily-workflow';
import AddDailyWorkflowModule from '@/modules/admin/daily-workflow/add';
import useDailyWorkflow from '@/services/daily-workflow';
import React, { FC } from 'react';
import { toast } from 'sonner';

export interface DailyWorkflowPageProps {
    searchParams: Promise<{ date: string }>
}


const fetchReport = async (date: string = new Date().toISOString()) => {
    const { token } = await getAuth();
    const { getByDate } = useDailyWorkflow({ token: token })
    return await getByDate(date)
}


const DailyWorkflowPage: FC<DailyWorkflowPageProps> = async ({ searchParams }) => {
    const { date } = await searchParams;
    const report = await fetchReport(date)

    return (
        <>
            <Title text='All DailyReports' buttonText='Add Report' url='/admin/daily-workflow/add' />
            <DailyWorkFLowModule report={report} />
        </>
    );
};

export default DailyWorkflowPage;