import {EOrder, EventData, EventPayload, IMeta, IPaginationRequest, IPaginationResponse} from "../../type.ts";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {EventsService} from "../../api/eventsService.ts";

type initialStateProps = {
    events: EventData[];
    meta: IMeta;
    order: EOrder;
    selectedEvent: EventData | null;
    isLoading: boolean;
    search: string;
}

const initialState: initialStateProps = {
    events: [],
    order: EOrder.DESC,
    isLoading: false,
    selectedEvent: null,
    meta: {
        page: 1,
        take: 10,
        itemCount: 0,
        pageCount: 0,
        hasPreviousPage: false,
        hasNextPage: false,
    },
    search: '',
}

const eventsSlice = createSlice({
    name: 'events',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getEventsAsyncThunk.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(getEventsAsyncThunk.fulfilled, (state, action: PayloadAction<IPaginationResponse<EventData>>) => {
            state.isLoading = false;
            state.events = action.payload.data;
            state.meta = action.payload.meta;
        })
        builder.addCase(createEventAsyncThunk.fulfilled, (state, action: PayloadAction<EventData>) => {
            state.events.unshift(action.payload);
        })
        builder.addCase(getEventByIdAsyncThunk.fulfilled, (state, action: PayloadAction<EventData>) => {
            state.selectedEvent = action.payload;
        })
    }
})


export const getEventsAsyncThunk = createAsyncThunk(
    'events/getEventsAsyncThunk',
    async (
        params: IPaginationRequest & { roomId?: number }
    ): Promise<IPaginationResponse<EventData>> => {
        const response = await EventsService.getEvents(params);
        return response.data;
    })

export const createEventAsyncThunk = createAsyncThunk(
    'events/createEventAsyncThunk',
    async (data: EventPayload): Promise<EventData> => {
        const response = await EventsService.createEvent(data);
        return response.data;
    })

export const getEventByIdAsyncThunk = createAsyncThunk(
    'events/getEventByIdAsyncThunk',
    async (id: number): Promise<EventData> => {
        const response = await EventsService.getEventById(id);
        return response.data;
    })


export default eventsSlice.reducer;

export const {} = eventsSlice.actions;