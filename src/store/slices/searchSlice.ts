import { createSlice } from '@reduxjs/toolkit';

type State = {
  searchedText: string;
};

const initialState: State = {
  searchedText: '',
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    search: (state, action) => {
      state.searchedText = action.payload;
    },
    resetSearchedText: () => initialState,
  },
});

export const { search, resetSearchedText } = searchSlice.actions;

export default searchSlice.reducer;
