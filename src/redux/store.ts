import { configureStore } from '@reduxjs/toolkit'
import vesselReducer from '../features/map/vesselSlice'
import animationReducer from '../features/animation/animationSlice'

const store = configureStore({
  reducer: {
    vessel: vesselReducer,
    animation: animationReducer
  }
})

export default store
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

