import axiosInstance from "../utils/axios.ts";
import {IPaginationRequest, UserData, LockedUserPayload, UserCreatePayload} from "../type.ts";


const createUser = (payload: UserCreatePayload) => axiosInstance.post('/users', payload);
const getUsers = (payload: IPaginationRequest) => axiosInstance.get('/users', {
    params: payload
});
const lockedUser = (payload: LockedUserPayload) => axiosInstance.put('/users/lock', {}, {
    params: payload
});
const deleteUser = (id: number) => axiosInstance.delete('/users', {
    params: {
        id
    }
});

const getUsersNoPagination = () => axiosInstance.get<UserData[]>('/users/all');

export const updateRole = (id: number, role: string) => axiosInstance.put('/users/role', {}, {
    params: {
        id,
        role
    }
});

export const UsersService = {
    getUsers,
    lockedUser,
    deleteUser,
    getUsersNoPagination,
    createUser,
    updateRole
}
