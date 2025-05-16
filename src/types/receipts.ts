import { ICustomer } from "./customer";

export enum Currency {
    Usd = 'USD',
    Lbp = 'LBP',
    Eur = 'EUR',
    Other = 'OTHER',
  }
  

export interface IِAddReceipt {
    customer: string;
    invoiceNb: string;
    date: Date;
    weight?: number;
    karat?: number;
    cash?: number;
    currency?: Currency;
    description?: string;
}
export interface IِReceipt {
    _id?:string
    customer: ICustomer;
    invoiceNb: string;
    date: Date;
    weight?: number;
    karat?: number;
    cash: number;
    currency?: Currency;
    description: string;
}
