import { configureStore } from '@reduxjs/toolkit';
import { charactersApi } from './charactersApi';
import activeCharacterReducer from './activeCharacter';

export const store = configureStore({
  reducer: {
    [charactersApi.reducerPath]: charactersApi.reducer,
    activeCharacter: activeCharacterReducer,
  },
  middleware: (getDefaultMiddlware) => getDefaultMiddlware().concat(charactersApi.middleware),
});
