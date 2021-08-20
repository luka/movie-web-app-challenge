import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { apiGetMovieDetails, apiGetMovies } from "../api";
import {
  asyncThunkReducers,
  fetchError,
  fetchStart,
} from "../utils/asyncThunk";
import { findBy, makePagination } from "../utils/toolkit";

//
// movies feature
//
export const fetchMovies = createAsyncThunk(
  "movies/fetchStatus",
  async function asyncThunk(page = 1, thunkApi) {
    try {
      const {
        movies: { query, data },
      } = thunkApi.getState();
      if (query.length > 0) {
        // only fetch when sth typed
        const { totalResults, Search: items } = await apiGetMovies(query, page);
        return {
          items: page > 1 ? (data.items || []).concat(items) : items,
          pagination: makePagination(Number(totalResults), page),
        };
      }
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
    },
  },
  extraReducers: asyncThunkReducers(fetchMovies),
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
  initialState: { selected: null },
  extraReducers: {
    [fetchMovieDetails.pending]: fetchStart,
    [fetchMovieDetails.rejected]: fetchError,
    [fetchMovieDetails.fulfilled]: (state, action) => {
      const { payload } = action;
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
