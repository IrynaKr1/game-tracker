import { configureStore } from '@reduxjs/toolkit';
import gamesReducer from './slices/gamesSlice';

const store = configureStore({
  reducer: {
    gamesData: gamesReducer,
  },
});

export default store;
