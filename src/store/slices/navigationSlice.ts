import { createSlice } from '@reduxjs/toolkit';

type State = {
  isBasketClicked: boolean;
};

const initialState: State = {
  isBasketClicked: false,
};

const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    setIsBasketClicked: (state, action) => {
      state.isBasketClicked = action.payload;
    },
  },
});

export const { setIsBasketClicked } = navigationSlice.actions;

export default navigationSlice.reducer;