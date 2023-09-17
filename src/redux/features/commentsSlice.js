import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import commentService from './commentsService'

const initialState = {
  comments: []
}

export const getComments = createAsyncThunk('comments/get', async (taskId) => {
  const comments = await commentService.getAll(taskId);
  return comments;
});


export const commentSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    reset: (state) => {
      state.comments = []
    }
  },
  extraReducers: (builder) => {
    builder
      //get all comments
      .addCase(getComments.pending, (state) => {
        state.comments = []
      })
      .addCase(getComments.fulfilled, (state, action) => {
        state.comments = action.payload
      })
      .addCase(getComments.rejected, (state, action) => {
        state.comments = []
      })
  }
})

export const { reset } = commentSlice.actions

export default commentSlice.reducer
