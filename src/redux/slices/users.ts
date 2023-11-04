import {
    EOrder,
    IMeta,
    IPaginationRequest,
    IPaginationResponse,
    LockedUserPayload,
    UserCreatePayload,
    UserData
} from "../../type.ts";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {UsersService} from "../../api/usersService.ts";
import {message} from "antd";

type initialStateProps = {
    users: UserData[];
    isLoading: boolean;
    order: EOrder;
    meta: IMeta;
}

const initialState: initialStateProps = {
    users: [],
    isLoading: false,
    order: EOrder.DESC,
    meta: {
        page: 1,
        take: 10,
        itemCount: 0,
        pageCount: 0,
        hasPreviousPage: false,
        hasNextPage: false
    }
}

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(createUserAsyncThunk.fulfilled, (state, action: PayloadAction<UserData>) => {
            state.users.unshift(action.payload);
            message.success('Tạo mới người dùng thành công');
        })
        builder.addCase(getUsersAsyncThunk.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(getUsersAsyncThunk.fulfilled, (state, action: PayloadAction<IPaginationResponse<UserData>>) => {
            state.isLoading = false;
            state.users = action.payload.data;
            state.meta = action.payload.meta;
        })
        builder.addCase(lockUserAsyncThunk.fulfilled, (state, action: PayloadAction<UserData>) => {
            const index = state.users.findIndex(user => user.id === action.payload.id);
            state.users[index] = action.payload;
        })
        builder.addCase(deleteUserAsyncThunk.fulfilled, (state, action: PayloadAction<number>) => {
            const index = state.users.findIndex(user => user.id === action.payload);
            state.users.splice(index, 1);
            message.success('Xóa người dùng thành công');
        })
        builder.addCase(deleteUserAsyncThunk.rejected, (state) => {
            message.error('Xóa người dùng thất bại');
        })
        builder.addCase(getUsersAsyncThunk.rejected, (state) => {
            message.error('Lỗi server');
        })
        builder.addCase(updateRoleAsyncThunk.fulfilled, (state, action: PayloadAction<UserData>) => {
            const index = state.users.findIndex(user => user.id === action.payload.id);
            state.users[index] = action.payload;
            message.success('Cập nhật quyền thành công');
        })
    }
})


export const createUserAsyncThunk = createAsyncThunk(
    'users/createUserAsyncThunk',
    async (payload: UserCreatePayload) => {
        const response = await UsersService.createUser(payload);
        return response.data;
    }
)


export const getUsersAsyncThunk = createAsyncThunk(
    'users/getUsersAsyncThunk',
    async (payload: IPaginationRequest) => {
        const response = await UsersService.getUsers(payload);
        return response.data;
    })

export const lockUserAsyncThunk = createAsyncThunk(
    'users/lockUserAsyncThunk',
    async (payload: LockedUserPayload) => {
        const response = await UsersService.lockedUser(payload);
        return response.data;
    }
)

export const deleteUserAsyncThunk = createAsyncThunk(
    'users/deleteUserAsyncThunk',
    async (id: number) => {
        const response = await UsersService.deleteUser(id);
        return id
    }
)

export const updateRoleAsyncThunk = createAsyncThunk(
    'users/updateRoleAsyncThunk',
    async (payload: { id: number, role: string }) => {
        const response = await UsersService.updateRole(payload.id, payload.role);
        return response.data;
    }
)

export default usersSlice.reducer;