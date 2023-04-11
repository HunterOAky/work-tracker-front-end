import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface AuthState {
  loggedIn: boolean;
}

const initialState: AuthState = {
  loggedIn: false
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loggedIn: (state, action: PayloadAction<boolean>) => {
      state.loggedIn = action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { loggedIn } = authSlice.actions

export default authSlice.reducer