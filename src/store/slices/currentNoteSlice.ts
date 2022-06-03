import { createSlice } from '@reduxjs/toolkit';

type State = {
  id: string | undefined;
};

const initialState: State = {
  id: undefined,
};

const currentNoteSlice = createSlice({
  name: 'currentNote',
  initialState,
  reducers: {
    setId: (state, action) => {
      state.id = action.payload;
    },
    resetCurrentNoteState: () => initialState,
  },
});

export const { setId, resetCurrentNoteState } = currentNoteSlice.actions;

export default currentNoteSlice.reducer;
