import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import taskService from './taskService'

const initialState = {
  tasks: []
}

export const getTasks = createAsyncThunk('tasks/get', async () => {
  const tasks = await taskService.getAll();
  return tasks;
});

export const addTask = createAsyncThunk('tasks/add', async (task, thunkApi) => {
  try {
    const createdTask = await taskService.create(task);
    return createdTask;
  } catch (err) {
    console.log(err);
    return thunkApi.rejectWithValue(err);
  }
});

export const filterTask = createAsyncThunk('tasks/filter', async (val, thunkApi) => {
  try {
    const filteredTask = await taskService.filterTask(val);
    return filteredTask;
  } catch (err) {
    console.log(err);
    return thunkApi.rejectWithValue(err);
  }
});

export const searchTask = createAsyncThunk('tasks/search', async (val, thunkApi) => {
  try {
    const searchedTask = await taskService.searchTasks(val);
    return searchedTask;
  } catch (err) {
    console.log(err);
    return thunkApi.rejectWithValue(err);
  }
});

export const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    reset: (state) => {
      state.tasks = []
    }
  },
  extraReducers: (builder) => {
    builder
      //get all tasks
      .addCase(getTasks.pending, (state) => {
        state.tasks = []
      })
      .addCase(getTasks.fulfilled, (state, action) => {
        state.tasks = action.payload
      })
      .addCase(getTasks.rejected, (state, action) => {
        state.tasks = []
      })

      //add task
      .addCase(addTask.pending, (state) => {
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.tasks = [
          ...state.tasks,
          action.payload
        ]
      })
      .addCase(addTask.rejected, (state, action) => {
        state.tasks = []
      })

      //filter task
      .addCase(filterTask.pending, (state) => {
        state.tasks = []
      })
      .addCase(filterTask.fulfilled, (state, action) => {
        state.tasks = action.payload.data
      })
      .addCase(filterTask.rejected, (state, action) => {
        state.tasks = []
      })

      //search task
      .addCase(searchTask.pending, (state) => {
        state.tasks = []
      })
      .addCase(searchTask.fulfilled, (state, action) => {
        const { payload: { data: { data: resData } } } = action || {}
        state.tasks = resData
      })
      .addCase(searchTask.rejected, (state, action) => {
        state.tasks = []
      })
  }
})

export const { reset } = taskSlice.actions

export default taskSlice.reducer
