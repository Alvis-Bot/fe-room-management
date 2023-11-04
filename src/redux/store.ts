import { configureStore } from '@reduxjs/toolkit'
import usersReducer from './slices/users'
import roomsReducer from './slices/rooms'
import roomCategoriesReducer from './slices/roomCategory.ts'
import eventsReducer from './slices/event.ts'
import attendancesReducer from './slices/attendance.ts'
import attendanceDetailsReducer from './slices/attendanceDetails.ts'
const store = configureStore({
    reducer: {
        users: usersReducer,
        rooms: roomsReducer,
        roomCategories: roomCategoriesReducer,
        events: eventsReducer,
        attendances: attendancesReducer,
        attendanceDetails: attendanceDetailsReducer,
    }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store

