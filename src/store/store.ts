import { configureStore } from '@reduxjs/toolkit'
import todoSLice from '../reducers/todoSlice'

export const store = configureStore({
  reducer: {
    todo: todoSLice
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch