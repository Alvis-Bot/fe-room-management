import {IRoomCategory} from "../../type.ts";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RoomsService} from "../../api/roomsService.ts";

type initialStateProps = {
    roomCategories: IRoomCategory[];
    isLoading: boolean;
    search: string;
}

const initialState: initialStateProps = {
    roomCategories: [],
    isLoading: false,
    search: '',
}

const roomCategoriesSlice = createSlice({
    name: 'roomCategories',
    initialState,
    reducers: {

    },
    extraReducers: builder => {
        builder.addCase(getRoomCategoriesAsyncThunk.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(getRoomCategoriesAsyncThunk.fulfilled, (state, action: PayloadAction<IRoomCategory[]>) => {
            state.isLoading = false;
            state.roomCategories = action.payload;
        })
    }
})


export const getRoomCategoriesAsyncThunk = createAsyncThunk(
    'rooms/getRoomCategoriesAsyncThunk',
    async () => {
        const response = await RoomsService.getRoomCategories();
        return response.data;
    })

export default roomCategoriesSlice.reducer;

export const {  } = roomCategoriesSlice.actions;