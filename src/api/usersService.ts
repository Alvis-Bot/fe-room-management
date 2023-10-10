import axiosInstance from "../utils/axios.ts";
import {IPaginationRequest} from "../type.ts";


export const UsersService = {
     getUsers : (payload: IPaginationRequest) => axiosInstance.get('/users/all', {
          params: payload
     })
}