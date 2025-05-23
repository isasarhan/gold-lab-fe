import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import { ISalaryReport } from '@/types/salary-payment';
import React, { FC } from 'react';
import PaymentsDialog from './components/payments-dialog';
import { Pen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import ReportsFilter from './components/reports-filter';

export interface EmployeePaymentsModuleProps {
    reports: ISalaryReport[]
}

const EmployeePaymentsModule: FC<EmployeePaymentsModuleProps> = ({ reports }) => {

    return (
        <div className='flex flex-col gap-5'>
            <ReportsFilter />
            <div className='grid grid-cols-4'>
                {
                    reports.map((report) => {
                        return (
                            <Card key={report._id} >
                                <CardContent>
                                    <div className='flex justify-between items-center mb-3'>
                                        <div className='font-bold text-lg'>{report.employee.name}</div>
                                        <div className='flex gap-3'>
                                            <Button variant="outline" size={'icon'}><Pen /></Button>
                                            <PaymentsDialog report={report} />
                                        </div>
                                    </div>
                                    <div>{report.date.month} - {report.date.year}</div>
                                    <div> Salary: <span className='text-green-700'>{report.employee.salary}$</span></div>
                                    <div className="flex justify-between">
                                        <div>Number of Payments: </div>
                                        <Badge>{report.payments.length}</Badge>
                                    </div>
                                </CardContent>
                            </Card>
                        )
                    })
                }
            </div>
        </div>
    );
};

export default EmployeePaymentsModule;