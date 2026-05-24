import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as API from '../../api';

const GAMES_SLICE_NAME = 'games';

const initialState = {
  games: [],
  isFetching: false,
  error: null,
  filter: {
    status: null,
  },
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

export const deleteGameThunk = createAsyncThunk(
  `${GAMES_SLICE_NAME}/delete`,
  async (payload, { rejectWithValue }) => {
    try {
      const response = await API.deletGameById(payload);
      return payload;
    } catch (error) {
      return rejectWithValue({ errors: error.response.data });
    }
  }
);

const gameSlice = createSlice({
  name: GAMES_SLICE_NAME,
  initialState,
  reducers: {
    changeGameStatusFilter: (state, { payload }) => {
      state.filter.status = payload;
    },
  },
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

    //delete

    builder.addCase(deleteGameThunk.fulfilled, (state, { payload }) => {
      state.games = state.games.filter(g => g.id !== payload);
      state.error = null;
      state.isFetching = false;
    });
    builder.addCase(deleteGameThunk.rejected, (state, { payload }) => {
      state.error = payload;
      state.isFetching = false;
    });
  },
});

const { reducer, actions } = gameSlice;

export const { changeGameStatusFilter } = actions;

export default reducer;
