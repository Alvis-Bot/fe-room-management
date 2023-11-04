import axiosInstance from "../utils/axios.ts";
import {ILoginPayload, ILoginResponse} from "../type.ts";


export const AuthService = {
    login : (payload : ILoginPayload) => axiosInstance.post<ILoginResponse>('/auth/login' , payload),
}