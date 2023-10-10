import axiosInstance from "../utils/axios.ts";
import {IPaginationRequest} from "../type.ts";


export const RoomsService = {
    getRooms: async (pagination : IPaginationRequest) => axiosInstance.get('/room' , { params : pagination}),
    deleteRoom : (id: number)  => axiosInstance.delete(`/room/${id}`),
}