import { createSlice } from '@reduxjs/toolkit';

type State = {
  isAuthorized: boolean;
};

const initialState: State = {
  isAuthorized: false,
};

const authorizeSlice = createSlice({
  name: 'authorize',
  initialState,
  reducers: {
    authorize: (state, action) => {
      state.isAuthorized = action.payload;
    },
    resetAuthorizeSlice: () => initialState,
  },
});

export const { authorize, resetAuthorizeSlice } = authorizeSlice.actions;

export default authorizeSlice.reducer;
