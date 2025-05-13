
export enum Karat {
    K18 = '18K',
    K21 = '21K',
}
export enum ItemType {
    Gormet = 'gormet',
    LAZER = 'lazer',
    Boul = 'boul',
    Lock = 'lock',
    Stamp = 'stamp',
    Ramle = 'ramle',
    Forza = 'forza',
    Other = 'other',
}

export interface IOrder {
    _id?:string
    customer: string;
    weight: number;
    karat: Karat;
    perGram: number;
    perItem: number;
    invoiceNb: string;
    type: ItemType;
    quantity: number;
    description: string;
    date: Date;
}
export interface IInvoice {
    _id?: string
    invoiceNb: string;
    customer: string;
    orders: string[];
    totalWeight?: number;
    totalCash?: number;
    date: Date;
}