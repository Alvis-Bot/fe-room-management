import axiosInstance from "../utils/axios.ts";
import {AttendanceDetailData, IPaginationResponse} from "../type.ts";


export type AttendanceCreatePayload = {
    title: string;
    description: string;
    attendanceDetails: AttendanceDetailPayload[];
}

export type AttendanceDetailPayload = {
    userId: number;
}

const createAttendance = async (payload: AttendanceCreatePayload) => axiosInstance.post('/attendances', payload);
const getAttendances = async () => axiosInstance.get('/attendances');
const getAttendanceDetails = async (id: number) => axiosInstance.get<IPaginationResponse<AttendanceDetailData>>(`/attendances/details?id=${id}`);

const updateStatusAttendanceDetail = async (id: number, status: number) => axiosInstance.put(`/attendances/status?id=${id}&status=${status}`);

export const AttendanceService = {
    createAttendance,
    getAttendances,
    getAttendanceDetails,
    updateStatusAttendanceDetail
}