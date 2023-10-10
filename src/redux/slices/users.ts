import {IMeta, IPaginationRequest, IPaginationResponse, IUser} from "../../type.ts";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {UsersService} from "../../api/usersService.ts";

type initialStateProps = {
    users: IUser[];
    isLoading: boolean;
    meta: IMeta;
}

const initialState: initialStateProps = {
    users: [],
    isLoading: false,
    meta: {
        page: 1,
        take: 8,
        itemCount: 0,
        pageCount: 0,
        hasPreviousPage: false,
        hasNextPage: false
    }
}

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {


    },
    extraReducers: builder => {
        builder.addCase(getUsersAsyncThunk.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(getUsersAsyncThunk.fulfilled, (state, action: PayloadAction<IPaginationResponse<IUser>>) => {
            state.isLoading = false;
            state.users = action.payload.data;
            state.meta = action.payload.meta;
        })
    }
})


export const getUsersAsyncThunk = createAsyncThunk(
    'users/getUsersAsyncThunk',
    async (payload: IPaginationRequest) => {
        const response = await UsersService.getUsers(payload);
        return response.data;
    })

export default usersSlice.reducer;