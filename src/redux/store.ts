import { configureStore } from '@reduxjs/toolkit'
import incidentReducer from './incidentSlice'
import sizeReducer from './sizeSlice'

export const store = configureStore({
  reducer: {
    incidents: incidentReducer,
    windowSize: sizeReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch