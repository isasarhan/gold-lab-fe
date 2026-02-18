import { Currency } from "./receipts";
import { ISupplier } from "./supplier";

export interface ISupplyPayment {
    _id?: string
    supplier: string | ISupplier;
    invoiceNb: string;
    date: Date;
    weight: number;
    karat: number;
    cash: number;
    currency?: Currency;
    description?: string;
}