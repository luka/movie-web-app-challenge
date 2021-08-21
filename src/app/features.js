import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { apiGetMovieDetails, apiGetMovies } from "../api";
import { fetchError, fetchStart } from "../utils/asyncThunk";
import { findBy, makePagination } from "../utils/toolkit";

//
// movies feature
//
export const fetchMovies = createAsyncThunk(
  "movies/fetchStatus",
  async function asyncThunk(page = 1, thunkApi) {
    try {
      const { movies } = thunkApi.getState();
      const { query } = movies;
      const { totalResults, Search: items } = await apiGetMovies(query, page);
      return { items, page, totalResults };
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

const moviesSlice = createSlice({
  name: "movies",
  initialState: { query: "" },
  reducers: {
    setSearchQuery(state, { payload }) {
      state.query = payload;
      state.data = undefined;
    },
  },
  extraReducers: {
    [fetchMovies.pending]: fetchStart,
    [fetchMovies.rejected]: fetchError,
    [fetchMovies.fulfilled]: (state, { payload }) => {
      const { totalResults, items, page } = payload;
      return {
        ...state,
        loading: false,
        error: null,
        data: {
          items: page > 1 ? (state.data?.items || []).concat(items) : items,
          pagination: makePagination(Number(totalResults), page),
        },
      };
    },
  },
});

export const moviesReducer = moviesSlice.reducer;
export const { setSearchQuery } = moviesSlice.actions;

// movies selectors
export const selectMoviesStatus = (state) => state.movies;

export const selectSearchQuery = createSelector(
  selectMoviesStatus,
  ({ query }) => query
);

export const selectMovies = createSelector(
  selectMoviesStatus,
  ({ data = {} }) => data.items || []
);

export const makeSelectMovie = () => {
  return createSelector(
    selectMovies,
    (_, id) => id,
    (items, id) => {
      return findBy(items, id, "imdbID")[0];
    }
  );
};

//
// movie details feature
//

export const fetchMovieDetails = createAsyncThunk(
  "moviesDetails/fetchStatus",
  async function asyncThunk(id, thunkApi) {
    try {
      const { Response, ...data } = await apiGetMovieDetails(id);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

const moviesDetailsSlice = createSlice({
  name: "moviesDetails",
  initialState: {},
  extraReducers: {
    [fetchMovieDetails.pending]: fetchStart,
    [fetchMovieDetails.rejected]: fetchError,
    [fetchMovieDetails.fulfilled]: (state, { payload }) => {
      return {
        loading: false,
        error: null,
        data: { ...(state.data || {}), [payload.imdbID]: payload },
      };
    },
  },
});

export const detailsReducer = moviesDetailsSlice.reducer;

// details selectors
export const selectDetailsStatus = (state) => state.moviesDetails;

export const selectMovieDetails = createSelector(
  selectDetailsStatus,
  ({ data = {} }) => data
);

export const makeSelectDetails = () => {
  return createSelector(
    selectMovieDetails,
    (_, id) => id,
    (data, id) => {
      return data[id] || {};
    }
  );
};
