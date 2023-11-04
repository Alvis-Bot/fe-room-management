import axiosInstance from "../utils/axios.ts";
import {EventData, EventPayload, IPaginationRequest, IPaginationResponse} from "../type.ts";


export const EventsService = {
    getEvents: async (params: IPaginationRequest & { roomId?: number }) =>  axiosInstance.get<IPaginationResponse<EventData>>(`/events` ,{
        params : {
            ...params,
            roomId: params.roomId,
        }
    }),
    createEvent: (data: EventPayload) => axiosInstance.post(`/events`, data),
    getEventById: (id: number) => axiosInstance.get<EventData>(`/events/${id}`),
}