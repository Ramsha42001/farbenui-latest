import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import botReducer from '../features/bot/botSlice';
import documentReducer from '../features/document/documentSlice';
import modelReducer from '../features/model/modelSlice';
import { loadState, saveState } from '../localStorage';

const preloadedState = loadState();

export const store = configureStore({
  reducer: {
    auth: authReducer,
    bot: botReducer,
    document: documentReducer,
    model: modelReducer,
  },
  preloadedState,
});

store.subscribe(() => {
  saveState({
    auth: store.getState().auth,
  });
});