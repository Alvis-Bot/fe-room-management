import {AttendanceData, IMeta, IPaginationResponse} from "../../type.ts";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AttendanceCreatePayload, AttendanceService} from "../../api/attendanceService.ts";

type initialStateProps = {
    attendances: AttendanceData[];
    meta: IMeta;
    isLoading: boolean;
    search: string;
}

const initialState: initialStateProps = {
    attendances: [],
    isLoading: false,
    meta: {
        page: 1,
        take: 10,
        itemCount: 0,
        pageCount: 0,
        hasPreviousPage: false,
        hasNextPage: false,
    },
    search: '',
}

const attendancesSlice = createSlice({
    name: 'attendances',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getAttendancesAsyncThunk.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(getAttendancesAsyncThunk.fulfilled, (state, action: PayloadAction<IPaginationResponse<AttendanceData>>) => {
            state.isLoading = false;
            state.attendances = action.payload.data;
            state.meta = action.payload.meta;
        })
        builder.addCase(createAttendanceAsyncThunk.fulfilled, (state, action: PayloadAction<AttendanceData>) => {
            state.attendances.unshift(action.payload);
        })

    }
})


export const getAttendancesAsyncThunk = createAsyncThunk(
    'attendances/getAttendancesAsyncThunk',
    async (): Promise<IPaginationResponse<AttendanceData>> => {
        const response = await AttendanceService.getAttendances();
        return response.data;
    })

export const createAttendanceAsyncThunk = createAsyncThunk(
    'attendances/createAttendanceAsyncThunk',
    async (data: AttendanceCreatePayload): Promise<AttendanceData> => {
        const response = await AttendanceService.createAttendance(data);
        return response.data;
    })






export default attendancesSlice.reducer;

export const {} = attendancesSlice.actions;