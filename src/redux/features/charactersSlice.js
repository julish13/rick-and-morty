/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialPage = 1;

export const fetchList = createAsyncThunk('characters/fetchList', async (page = initialPage) => fetch(`https://rickandmortyapi.com/api/character/?page=${page}`)
    .then((res) => res.json())
    .then((res) => ({ data: res, page })));

const charactersSlice = createSlice({
  name: 'characters',
  initialState: {
    pagesCount: null,
    charactersCount: null,
    activePage: initialPage,
    characters: [],
    loading: false,
    error: null,
  },
  extraReducers: {
    [fetchList.pending]: (state) => {
      state.loading = true;
    },
    [fetchList.fulfilled]: (state, action) => {
      state.loading = false;
      state.activePage = action.payload.page;
      state.characters = action.payload.data.results;
      state.pagesCount ??= action.payload.data.info.pages;
      state.charactersCount ??= action.payload.data.info.count;
    },
    [fetchList.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default charactersSlice.reducer;
