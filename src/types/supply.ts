import { Karat } from "./invoice";
import { ISupplier } from "./supplier";

export enum ItemType {
    Gormet = 'gormet',
    LAZER = 'lazer',
    Boul = 'boul',
    Lock = 'lock',
    Stamp = 'stamp',
    Ramle = 'ramle',
    Forza = 'forza',
    WeddingRing = 'wedding ring',
    Ring = 'ring',
    Bracelet = 'bracelet',
    Necklace = 'necklace',
    Bangle = 'bangle',
    Other = 'other',
}


export interface ISupply {
    _id: string
    supplier: ISupplier;
    weight: number;
    karat: Karat;
    perGram: number;
    date: Date;
    description: string;
    type: ItemType;
    invoiceNb: string;
}
export interface IAddSupply {
    supplier: string;
    weight: number;
    karat?: Karat;
    perGram: number;
    date: Date;
    description?: string;
    type?: ItemType;
    invoiceNb: string;
}