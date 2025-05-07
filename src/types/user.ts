
export interface IUser {
    _id?: string
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone: string;
    isSuperAdmin: boolean;
    profileUrl: string;
    role: Role |string ;
    isApproved: boolean;
}

export enum Role {
    Admin = 'admin',
    User = 'user',
    Manager = 'manager',
    Moderator = 'moderator',
}
