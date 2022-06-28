import { configureStore } from '@reduxjs/toolkit';
import { charactersApi } from './charactersApi';

export const store = configureStore({
  reducer: {
    [charactersApi.reducerPath]: charactersApi.reducer,
  },
  middleware: (getDefaultMiddlware) => getDefaultMiddlware().concat(charactersApi.middleware),
});
