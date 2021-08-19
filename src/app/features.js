import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
  name: "movies",
  initialState: [],
  reducers: {
    getMovies(state, { payload }) {
      return state;
    },
  },
});
export const moviesReducer = moviesSlice.reducer;
