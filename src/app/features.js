import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { apiGetMovies } from "../api";
import { asyncThunkReducers } from "../utils/asyncThunk";
import { findBy } from "../utils/toolkit";

export const fetchMovies = createAsyncThunk(
  "movies/fetchStatus",
  async function asyncThunk(query, thunkApi) {
    try {
      const { totalResults, Search: items } = await apiGetMovies(query);
      return { totalResults, items };
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

const moviesSlice = createSlice({
  name: "movies",
  initialState: { query: "batman" },
  reducers: {
    setSearchQuery(state, { payload }) {
      state.query = payload;
    },
  },
  extraReducers: asyncThunkReducers(fetchMovies),
});

export const moviesReducer = moviesSlice.reducer;
export const { setSearchQuery } = moviesSlice.actions;

export const selectMoviesStatus = (state) => state.movies;
export const selectSearchQuery = createSelector(
  selectMoviesStatus,
  ({ query }) => query
);

export const selectMovies = createSelector(
  selectMoviesStatus,
  ({ data = {} }) => data.items || []
);
export const makeSelectMovieItem = () => {
  return createSelector(
    selectMovies,
    (_, id) => id,
    (allItems, id) => {
      return findBy(allItems.collection, id)[0];
    }
  );
};
