export interface IInvoice {
    _id?: string
    invoiceNb: string;
    customer: string;
    orders: string[];
    totalWeight?: number;
    totalCash?: number;
    date: Date;
}