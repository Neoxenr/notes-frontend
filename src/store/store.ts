import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { api } from '../api/api';
import authorizeSlice from './slices/authorizeSlice';
import buttonClickedSlice from './slices/buttonClickedSlice';
import currentNoteSlice from './slices/currentNoteSlice';
import navigationSlice from './slices/navigationSlice';
import searchSlice from './slices/searchSlice';

const checkTokenExpirationMiddleware =
  (store: any) => (next: any) => (action: any) => {
    const token = localStorage.getItem('token');
    if (token) {
      const parsedToken = JSON.parse(window.atob(token.split('.')[1]));
      if (parsedToken.exp < Date.now() / 1000) {
        next(action);
        localStorage.clear();
        window.location.reload();
      }
    }
    next(action);
  };

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    currentNote: currentNoteSlice,
    navigation: navigationSlice,
    authorize: authorizeSlice,
    buttonClicked: buttonClickedSlice,
    search: searchSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(api.middleware)
      .concat(checkTokenExpirationMiddleware),
});

setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
