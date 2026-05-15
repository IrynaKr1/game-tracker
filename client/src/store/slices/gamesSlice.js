import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as API from '../../api';

const GAMES_SLICE_NAME = 'games';

const initialState = {
  games: [],
  isFetching: false,
  error: null,
};

export const createGameThunk = createAsyncThunk(
  `${GAMES_SLICE_NAME}/addGame`,
  async (payload, { rejectWithValue }) => {
    try {
      const {
        data: { data },
      } = await API.createGame(payload);
      return data;
    } catch (error) {
      return rejectWithValue({ errors: error.response.data });
    }
  }
);

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
    //add game

    builder.addCase(createGameThunk.pending, state => {
      state.isFetching = true;
      state.error = null;
    });

    builder.addCase(createGameThunk.fulfilled, (state, { payload }) => {
      state.isFetching = false;
      state.games.push(payload);
    });

    builder.addCase(createGameThunk.rejected, (state, { payload }) => {
      state.error = payload;
      state.isFetching = false;
    });

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
       state.error = payload;
      state.isFetching = false;
    });
  },
});

const { reducer } = gameSlice;

export default reducer;
