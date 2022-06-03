import { createSlice } from '@reduxjs/toolkit';

type State = {
  isChangeViewClick: boolean;
};

const initialState: State = {
  isChangeViewClick: false,
};

const buttonClickedSlice = createSlice({
  name: 'button clicked',
  initialState,
  reducers: {
    changeView: (state, action) => {
      state.isChangeViewClick = action.payload;
    },
    resetButtonClicked: () => initialState,
  },
});

export const { changeView, resetButtonClicked } = buttonClickedSlice.actions;

export default buttonClickedSlice.reducer;
