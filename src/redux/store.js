import { configureStore } from '@reduxjs/toolkit';
import charactersReducer from './features/charactersSlice';

export default configureStore({
  reducer: {
    characters: charactersReducer,
  },
});
