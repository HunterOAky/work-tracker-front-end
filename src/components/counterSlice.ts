import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface CounterState {
  time: number;
	running: boolean;
}

const initialState: CounterState = {
  time: 0,
	running: false,
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.time += 10;
    },
    run: (state) => {
      state.running = true;
    },
		stop: (state) => {
      state.running = false;
    },
		reset: (state) => {
      state.time = 0;
    },
  },
})

// Action creators are generated for each case reducer function
export const { increment, run, stop, reset } = counterSlice.actions

export default counterSlice.reducer