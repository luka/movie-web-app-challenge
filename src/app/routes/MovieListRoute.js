import { MoviesList } from "../MoviesList";
import { SearchBar } from "../SearchBar";

export function MoviesListRoute() {
  return (
    <div className="column center">
      <h1>Search Movie DB</h1>
      <SearchBar />
      <MoviesList />
    </div>
  );
}
