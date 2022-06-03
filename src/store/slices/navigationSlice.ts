import { createSlice } from '@reduxjs/toolkit';

type State = {
  isBasketClicked: boolean;
  isNotesClicked: boolean;
};

const initialState: State = {
  isBasketClicked: false,
  isNotesClicked: false,
};

const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    setIsBasketClicked: (state, action) => {
      Object.assign(state, initialState);
      state.isBasketClicked = action.payload;
    },
    setIsNotesClicked: (state, action) => {
      Object.assign(state, initialState);
      state.isNotesClicked = action.payload;
    },
    resetNavigationState: () => initialState,
  },
});

export const { setIsBasketClicked, setIsNotesClicked, resetNavigationState } =
  navigationSlice.actions;

export default navigationSlice.reducer;
