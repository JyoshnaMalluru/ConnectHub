import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchTwitterPosts } from '../api/twitter';
import { fetchNews } from '../api/news';

export const fetchUnifiedContent = createAsyncThunk(
  'content/fetchUnifiedContent',
  async (categories) => {
    const category = (categories && categories[0]) || 'technology';
    const news = await fetchNews(category);
    const twitter = await fetchTwitterPosts(category);
    return [...news, ...twitter];
  }
);

const contentSlice = createSlice({
  name: 'content',
  initialState: { items: [], status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUnifiedContent.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUnifiedContent.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchUnifiedContent.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch content';
      });
  },
});

export default contentSlice.reducer;
