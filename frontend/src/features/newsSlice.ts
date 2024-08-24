import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchNews = createAsyncThunk('news/fetchNews', async () => {
    const response = await axios.get('/news');
    return response.data;
});

const newsSlice = createSlice({
    name: 'news',
    initialState: [],
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchNews.fulfilled, (action) => action);
    }
});

export default newsSlice.reducer;