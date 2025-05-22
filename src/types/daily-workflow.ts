import { Karat } from "./invoice";

export enum Sector {
    Inventory = "inventory",
    Melting = "melting",
    Table = "table",
    Pull = "pull",
    Saw = "saw",
    Delivery = "delivery",
    Setting = "setting",
}

export interface IReport {
    from: Sector;
    to: Sector;
    karat: Karat;
    weight: number
    quantity?: number
    description?: string;
}


export interface IReportBalance {
    sector: Sector;
    weight: number;
    quantity: number;
    karat: Karat;
}

export interface IDailyWorkflow {
    _id?: string
    date: Date;
    reports: IReport[];
    balances?: IReportBalance[];
}