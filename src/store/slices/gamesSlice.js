import { createSlice } from '@reduxjs/toolkit';

const initialState = { games: [] };

const gamesSlice = createSlice({
  initialState,
  name: 'games',
  reducers: {},
});

const { reducer, actions } = gamesSlice;

export default reducer;
