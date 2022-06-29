/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  character: null,
};

const activeCharacterSlice = createSlice({
  name: 'activeCharacter',
  initialState,
  reducers: {
    setCharacter(state, action) {
      const character = action.payload;
      state.character = character;
    },
  },
});

export const activeCharacterActions = activeCharacterSlice.actions;
export default activeCharacterSlice.reducer;
