export type User = {
    _id?: string;
    fullname: string;
    username: string;
    email?: string;
    phone?: string;
    roles: string[];
    isBan: boolean;
    avatar?: string | null;
    biography: string;
    password: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};