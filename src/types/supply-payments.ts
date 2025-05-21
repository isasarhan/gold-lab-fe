import { Currency } from "./receipts";
import { ISupplier } from "./supplier";

export interface IAddSupplyPayment {
    supplier: string;
    invoiceNb: string;
    date: Date;
    weight?: number;
    karat?: number;
    cash?: number;
    currency?: Currency;
    description?: string;
}
export interface ISupplyPayment {
    _id?: string
    supplier: ISupplier;
    invoiceNb: string;
    date: Date;
    weight: number;
    karat: number;
    cash: number;
    currency: Currency;
    description: string;
}