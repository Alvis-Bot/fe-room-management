
import { AttendanceDetailData, IMeta, IPaginationResponse} from "../../type.ts";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import { AttendanceService} from "../../api/attendanceService.ts";

type initialStateProps = {
    attendanceDetails: AttendanceDetailData[];
    meta: IMeta;
    isLoading: boolean;
    search: string;
}

const initialState: initialStateProps = {
    isLoading: false,
    attendanceDetails: [],
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

const attendanceDetailsSlice = createSlice({
    name: 'attendanceDetails',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getAttendanceDetailsAsyncThunk.fulfilled, (state, action: PayloadAction<IPaginationResponse<AttendanceDetailData>>) => {
            state.attendanceDetails = action.payload.data;
            state.meta = action.payload.meta;
            state.isLoading = false;
        })
        builder.addCase(getAttendanceDetailsAsyncThunk.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(getAttendanceDetailsAsyncThunk.rejected, (state) => {
            state.isLoading = false;
        })
        builder.addCase(updateStatusAttendanceDetailAsyncThunk.fulfilled, (state, action: PayloadAction<AttendanceDetailData>) => {
            const index = state.attendanceDetails.findIndex(item => item.id === action.payload.id);
            state.attendanceDetails[index] = action.payload;
        })

    }
})




export const getAttendanceDetailsAsyncThunk = createAsyncThunk(
    'attendances/getAttendanceDetailsAsyncThunk',
    async (id: number) => {
        const response = await AttendanceService.getAttendanceDetails(id);
        return response.data;
    })


export const updateStatusAttendanceDetailAsyncThunk = createAsyncThunk(
    'attendances/updateStatusAttendanceDetailAsyncThunk',
    async (data: { id: number, status: number }) => {
        const response = await AttendanceService.updateStatusAttendanceDetail(data.id, data.status);
        return response.data;
    })






export default attendanceDetailsSlice.reducer;

export const {} = attendanceDetailsSlice.actions;