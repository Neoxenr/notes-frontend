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
  },
});

export const { setId } = currentNoteSlice.actions;

export default currentNoteSlice.reducer;
