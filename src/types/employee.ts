export interface IEmployee {
    _id?: string
    name: string;
    position: string;
    phone: string;
    email: string;
    salary: number
}

export interface IAttendence {
    employee: IEmployee;
    arrival: Date;
    departure: Date
}