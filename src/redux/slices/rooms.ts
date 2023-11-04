import {EOrder, IMeta, IPaginationRequest, IPaginationResponse, RoomData} from "../../type.ts";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RoomsService} from "../../api/roomsService.ts";
import {message} from "antd";

type initialStateProps = {
    rooms: RoomData[];
    allRooms: RoomData[];
    isLoading: boolean;
    search: string;
    order: EOrder;
    currentRoom: RoomData | null;
    meta: IMeta;
}

const initialState: initialStateProps = {
    allRooms: [],
    rooms: [],
    order: EOrder.DESC,
    isLoading: false,
    search: '',
    currentRoom: null,
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
        builder.addCase(getRoomsAsyncThunk.fulfilled, (state, action: PayloadAction<IPaginationResponse<RoomData>>) => {
            state.isLoading = false;
            state.rooms = action.payload.data;
            state.meta = action.payload.meta;
        })
        builder.addCase(getRoomsAsyncThunk.rejected, (state) => {
            state.isLoading = false;
        })
        builder.addCase(deleteRoomAsyncThunk.fulfilled, (state, action: PayloadAction<number>) => {
            state.rooms = state.rooms.filter(room => room.id !== action.payload);
        })
        builder.addCase(getRoomByIdAsyncThunk.fulfilled, (state, action: PayloadAction<RoomData>) => {
            state.currentRoom = action.payload;
        })
        builder.addCase(getAllRoomsAsyncThunk.fulfilled, (state, action: PayloadAction<RoomData[]>) => {
            state.allRooms = action.payload;
        })
        builder.addCase(createRoomAsyncThunk.fulfilled, (state, action: PayloadAction<RoomData>) => {
            state.rooms.unshift(action.payload);
            message.success('Tạo mới phòng thành công');
        })
    }
})


export const getRoomsAsyncThunk = createAsyncThunk(
    'rooms/getRoomsAsyncThunk',
    async (payload: IPaginationRequest) => {
        const response = await RoomsService.getRooms(payload);
        return response.data;
    })

export const getAllRoomsAsyncThunk = createAsyncThunk(
    'rooms/getAllRoomsAsyncThunk',
    async () => {
        const response = await RoomsService.getAllRooms();
        return response.data;
    })


export const deleteRoomAsyncThunk = createAsyncThunk(
    'rooms/deleteRoomAsyncThunk',
    async (id: number) => {
        await RoomsService.deleteRoom(id);
        return id;
    })

export const getRoomByIdAsyncThunk = createAsyncThunk(
    'rooms/getRoomByIdAsyncThunk',
    async (id: number) => {
        const response = await RoomsService.getRoomById(id);
        return response.data;
    })

export const createRoomAsyncThunk = createAsyncThunk(
    'rooms/createRoomAsyncThunk',
    async (payload: FormData) => {
        const response = await RoomsService.createRoom(payload);
        return response.data;
    })


export default roomsSlice.reducer;

export const {searchRooms} = roomsSlice.actions;