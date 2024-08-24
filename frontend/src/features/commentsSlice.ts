import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchComments = createAsyncThunk('comments/fetchComments', async (newsId: string) => {
    const response = await axios.get(`/comments?news_id=${newsId}`);
    return response.data;
});

const commentsSlice = createSlice({
    name: 'comments',
    initialState: [],
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchComments.fulfilled, (state, action) => action.payload);
    }
});

export default commentsSlice.reducer;