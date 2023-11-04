import axiosInstance from "../utils/axios.ts";
import {IPaginationRequest} from "../type.ts";


export const RoomsService = {
    getRooms: async (pagination: IPaginationRequest) => axiosInstance.get('/rooms', {params: pagination}),
    deleteRoom: (id: number) => axiosInstance.delete(`/rooms`, {params: {id}}),
    getRoomCategories: () => axiosInstance.get('/room-categories'),
    getAllRooms: () => axiosInstance.get('/rooms/all'),
    getRoomById: (id: number) => axiosInstance.get(`/rooms/${id}`),
    createRoom(payload: FormData) {
        return axiosInstance.post('/rooms', payload, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    }
}