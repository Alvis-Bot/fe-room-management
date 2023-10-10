

export enum ERole {
    ADMIN = 'ADMIN',
    USER = 'USER'
}

export interface IUser {
    id: number;
    fullName: string;
    username: string;
    password: string;
    roles: ERole;
}

export interface IRoom {
    id: number;
    name: string;
    seat: number;
    status: boolean;
    image: string;
}



export interface IMeta {
    page: number;
    take: number;
    itemCount: number;
    pageCount: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
}

export interface IPaginationResponse<T> {
    data: T[];
    meta: IMeta;
}

export enum EOrder {
    ASC = 'ASC',
    DESC = 'DESC'
}

export interface IPaginationRequest {
    order?: EOrder;
    page?: number;
    take?: number;
    search?: string;
}