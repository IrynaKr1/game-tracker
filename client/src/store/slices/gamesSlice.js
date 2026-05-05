import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as API from '../../api';

const GAMES_SLICE_NAME = 'games';

const initialState = {
  games: [],
  isFetching: false,
  error: null,
};

export const getGameThunk = createAsyncThunk(
  `${GAMES_SLICE_NAME}/getAll`,
  async (payload, { rejectWithValue }) => {
    try {
      const {
        data: { data },
      } = await API.getAllGames();
      return data;
    } catch (error) {
      return rejectWithValue({ errors: error.response.data });
    }
  }
);

const gameSlice = createSlice({
  name: GAMES_SLICE_NAME,
  initialState,
  reducers: {},
  extraReducers: builder => {
    // getAll
    builder.addCase(getGameThunk.pending, state => {
      state.isFetching = true;
      state.error = null;
    });

    builder.addCase(getGameThunk.fulfilled, (state, { payload }) => {
      state.isFetching = false;
      state.games = payload;
    });

    builder.addCase(getGameThunk.rejected, (state, { payload }) => {
      state.isFetching = false;
      state.error = payload;
    });
  },
});

const { reducer } = gameSlice;

export default reducer;
