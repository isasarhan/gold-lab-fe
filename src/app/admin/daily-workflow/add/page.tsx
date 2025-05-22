import Title from '@/components/common/title';
import AddDailyWorkflowModule from '@/modules/admin/daily-workflow/add';
import React, { FC } from 'react';

export interface AddDailyWorkflowPageProps { }

const AddDailyWorkflowPage: FC<AddDailyWorkflowPageProps> = () => {
    return (
        <>
            <Title text='New Daily Report' goBack={true} />
            <AddDailyWorkflowModule />
        </>
    );
};

export default AddDailyWorkflowPage;