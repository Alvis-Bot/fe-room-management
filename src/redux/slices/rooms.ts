import {IMeta, IPaginationRequest, IPaginationResponse, IRoom} from "../../type.ts";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RoomsService} from "../../api/roomsService.ts";

type initialStateProps = {
    rooms: IRoom[];
    isLoading: boolean;
    search: string;
    meta: IMeta;
}

const initialState: initialStateProps = {
    rooms: [],
    isLoading: false,
    search: '',
    meta: {
        page: 1,
        take: 8,
        itemCount: 0,
        pageCount: 0,
        hasPreviousPage: false,
        hasNextPage: false
    }
}

const roomsSlice = createSlice({
    name: 'rooms',
    initialState,
    reducers: {
        searchRooms: (state, action: PayloadAction<string>) => {
            state.search = action.payload;
        }

    },
    extraReducers: builder => {
        builder.addCase(getRoomsAsyncThunk.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(getRoomsAsyncThunk.fulfilled, (state, action: PayloadAction<IPaginationResponse<IRoom>>) => {
            state.isLoading = false;
            state.rooms = action.payload.data;
            state.meta = action.payload.meta;
        })
        builder.addCase(deleteRoomAsyncThunk.fulfilled, (state, action: PayloadAction<number>) => {
            state.rooms = state.rooms.filter(room => room.id !== action.payload);
            state.meta.itemCount -= 1;

        })
    }
})


export const getRoomsAsyncThunk = createAsyncThunk(
    'rooms/getRoomsAsyncThunk',
    async (payload: IPaginationRequest) => {
        const response = await RoomsService.getRooms(payload);
        return response.data;
    })


export const deleteRoomAsyncThunk = createAsyncThunk(
    'rooms/deleteRoomAsyncThunk',
    async (id: number) => {
        await RoomsService.deleteRoom(id);
        return id;
    })

export default roomsSlice.reducer;

export const {searchRooms} = roomsSlice.actions;