import { MonthEnum } from "@/lib/dates";

export enum PaymentTypeEnum {
    Bonus = 'bonus',
    Advance = 'advance',
    Overtime = 'overtime',
    Commission = 'commission',
    Monthly = 'monthly'
}

export interface IAddSalaryPayment {
    employee: string
    month: string;
    year: string;
    amount: number;
    type: PaymentTypeEnum;
    description?: string
    date: Date
}



export interface YearMonthDate {
    month: MonthEnum;
    year: string;
}

interface Employee {
    _id: string;
    name: string;
    salary: number;
}

export interface ISalaryPayment {
    date: Date
    amount: number
    type: PaymentTypeEnum
    description: string
}


export interface ISalaryReport {
    _id: string
    date: YearMonthDate
    employee: Employee
    payments: ISalaryPayment[];
}
