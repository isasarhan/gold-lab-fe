'use client'
import React, { FC } from 'react';
import FormDate from '@/components/common/form/date';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { usePathname, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

export interface DailyReportPropsFilter {}

interface Filter {
    date: Date
}
const DailyReportFilter: FC<DailyReportPropsFilter> = () => {
    const pathName = usePathname()
    const router = useRouter()
    const form = useForm<Filter>({
        mode: "onBlur",
    });
    const { handleSubmit } = form;

    const onSubmit = async (data: Filter) => {

        const params = new URLSearchParams();
        if (data.date) {
            params.append("date", data.date.toISOString());
        }
        router.push(`${pathName}?${params.toString()}`);
    };

    return <Card className='p-5'>
        <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-3 w-full md:flex-row">
              
                    <div className="flex-1">
                        <FormDate
                            control={form.control}
                            name="date"
                            defaultValue={new Date()}
                            title="Report Date"
                            placeholder="Pick a date"
                        />
                    </div>
                    <div className="flex-1 flex flex-col justify-end">
                        <Button type="submit">View</Button>
                    </div>
                </div>
            </form>
        </Form>
    </Card>
};

export default DailyReportFilter;