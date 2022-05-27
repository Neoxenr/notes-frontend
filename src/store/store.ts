import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { api } from '../api/api';

import currentNoteSlice from './slices/currentNoteSlice';

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    currentNote: currentNoteSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
