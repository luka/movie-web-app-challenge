import { configureStore } from "@reduxjs/toolkit";
import { moviesReducer } from "./features";

export const store = configureStore({
  reducer: { movies: moviesReducer },
});
