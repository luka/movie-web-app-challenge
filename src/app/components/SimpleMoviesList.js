import { useSelector } from "react-redux";
import { selectMovies } from "../features";
import { MovieListItem } from "./MovieListItem";
import { SearchBar } from "./SearchBar";

export function SimpleMoviesList() {
  const movies = useSelector(selectMovies);
  return (
    <>
      <SearchBar />
      <div className="movies-list">
        {movies.map((m) => (
          <MovieListItem key={m.imdbID} {...m} />
        ))}
      </div>
    </>
  );
}
