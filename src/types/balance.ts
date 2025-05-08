import { ICustomer } from "./customer";

export interface IBalance {
    _id: string;
    customer: ICustomer;
    gold: number;
    cash: number;
}

export interface IBalanceUpdate {
    _id?: string;
    customer: string;
    gold: number;
    cash: number;
}

export interface IBalanceTotals {
    totalGoldPositive: number
    totalGoldNegative: number
    totalCashPositive: number
    totalCashNegative: number
}