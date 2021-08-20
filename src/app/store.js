import { configureStore } from "@reduxjs/toolkit";
import { detailsReducer, moviesReducer } from "./features";

export const store = configureStore({
  reducer: { movies: moviesReducer, moviesDetails: detailsReducer },
});
