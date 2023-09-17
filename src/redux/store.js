import { configureStore } from '@reduxjs/toolkit';
import taskReducer from './features/taskSlice';
import commentReducer from './features/commentsSlice';

export const store = configureStore({
    reducer: {
        task: taskReducer,
        comments: commentReducer
    }
});

export default store;
