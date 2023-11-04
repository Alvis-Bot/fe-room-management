import {Dayjs} from "dayjs";
import type { UploadFile } from 'antd/es/upload/interface';

export enum ERole {
    ADMIN = 'ADMIN',
    USER = 'USER',
    MANAGER = 'MANAGER',
    INTERN = 'INTERN',
}

export type UserData = AuditData & {
    id: number;
    fullName: string;
    username: string;
    password: string;
    isLocked: boolean;
    studentCode: string;
    email: string;
    roles: ERole;
}

export type RoomData = AuditData &{
    id: number;
    name: string;
    roomCategory : IRoomCategory;
    quantity: number;
    status: boolean;
    images: string[];
}

export interface IRoomCategory {
    id: number;
    name: string;
}

export type EventData = AuditData & {
    name : string;
    date: Date;
    startTime: Date;
    endTime: Date;
    location: string;
    minParticipants: number;
    description: string;

}




export type AttendanceData = AuditData & {
    id: number;
    title : string;
    description: string;
    attendanceDetails: AttendanceDetailData[];
}



export type AttendanceDetailData = AuditData & {
    id: number;
    user: UserData;
    status: EAttendanceDetailStatus;
}


export type AuditData = {
    id : number;
    createdAt: Date;
    updatedAt: Date;
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

export type EventPayload = {
    name: string,
    location: string,
    minParticipants: number,
    roomId: number,
    date: Dayjs,
    time: Dayjs[],
    description: string,
}

export  enum EAttendanceDetailStatus {
    PRESENT = "PRESENT", // có mặt
    ABSENT = "ABSENT", // vắng mặt
    LATE = "LATE", // đến muộn
    LEAVE = "LEAVE", // về sớm
}
export enum EOrder {
    ASC = 'ASC',
    DESC = 'DESC'
}

export interface ILoginPayload {
    username: string;
    password: string;
}

export type UserCreatePayload = {
    username: string;
    password: string;
    fullName: string;
    email: string;
    studentCode: string;
    roles: ERole;
}

export interface ILoginResponse {
    accessToken: string;
    user: UserData;
}

export interface IPaginationRequest {
    order?: EOrder;
    page?: number;
    take?: number;
    search?: string;
}


export type RoomCreatePayload = {
    name: string;
    quantity: number;
    image:  UploadFile[]
}


export type LockedUserPayload = {
    id: number;
    isLocked: boolean;
}
