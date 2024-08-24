import { configureStore } from '@reduxjs/toolkit';
import newsReducer from '../features/newsSlice';
import commentsReducer from '../features/commentsSlice';

export const store = configureStore({
    reducer: {
        news: newsReducer,
        comments: commentsReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;