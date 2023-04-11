import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../components/counterSlice'
import postReducer from '../components/postSlice'
import authReducer from '../components/authSlice'

export const store = configureStore({
  reducer: {
		counter: counterReducer,
		post: postReducer,
		auth: authReducer,
	},
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch