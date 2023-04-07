import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../redux/store'
import { NumberLiteralType } from 'typescript';

export interface IPosts {
  postId: string;
  title: string;
  content: string;
  timeSpent: number;
  date: any;
};

interface postToUpdate {
  id: string;
  time?: number;
  note?: string;
  client?:string;
  date?: any;
  
}

const list:any = [];

export const postSlice = createSlice({
  name: 'post',
  initialState: {value: list},
  reducers: {
    removeAllPosts: (state) => {
      state.value = [];
    },
    addPost: (state, action: PayloadAction<IPosts>) => {
      state.value.push(action.payload);
    },
    deletePost: (state, action: PayloadAction<string>) => {
      state.value = state.value.filter((post:IPosts) => post.postId !== action.payload);
    },
    updatePost: (state, action: PayloadAction<postToUpdate>) => {
      state.value.map((post:IPosts) => {
        if (post.postId === action.payload.id) {
          post.timeSpent = action.payload.time!;
        }
      });
    },
    updatePostFull: (state, action: PayloadAction<postToUpdate>) => {
      state.value.map((post:IPosts) => {
        if (post.postId === action.payload.id) {
          post.timeSpent = action.payload.time!;
          post.title = action.payload.client!;
          post.content = action.payload.note!;
          post.date = action.payload.date!;
        }
      });
    },
  },
})

// Action creators are generated for each case reducer function
export const { addPost, deletePost, updatePost, updatePostFull, removeAllPosts } = postSlice.actions

export const postList = (state: RootState) => state.post.value
//export const selectNote = (state: RootState) => state.post.note

export default postSlice.reducer