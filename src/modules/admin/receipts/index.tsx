import CustomerDatesfilter from '@/components/common/customer-dates-filters';
import { ICustomer } from '@/types/customer';
import { IِReceipt } from '@/types/receipts';
import React, { FC } from 'react';
import Table, { Column } from '@/components/common/table';
import { dateFormatter } from '@/lib/dateFormatter';

export interface ReceiptsModuleProps {
    customers: ICustomer[]

    data: {
        data: IِReceipt[]
        total: number;
        page: number;
        pages: number;
    }
}

const ReceiptsModule: FC<ReceiptsModuleProps> = ({ data, customers }) => {
    const columns: Column[] = [
        { value: "invoiceNb", label: "Invoice #" },
        { value: "weight", label: "Weight" },
        { value: "karat", label: "Karat" },
        { value: "cash", label: "Cash" },
        { value: "currency", label: "Currency" },
        {
            label: "Date",
            render: (item: IِReceipt) =>
                <div>
                    {dateFormatter(item.date.toString())}
                </div>
        },
    ]
    return (
        <div className="flex flex-col gap-3 pb-7">
            <CustomerDatesfilter customers={customers} />
            <Table data={data.data} columns={columns} page={data.page} pages={data.pages} total={data.total} />
        </div>
    );
};

export default ReceiptsModule;