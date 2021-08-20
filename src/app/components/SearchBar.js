import { useDispatch, useSelector } from "react-redux";
import {
  fetchMovies,
  selectMoviesStatus,
  selectSearchQuery,
  setSearchQuery,
} from "../features";
import { SpinnerBox } from "./SpnnerBox";

export function SearchBar() {
  const { loading, error, data } = useSelector(selectMoviesStatus);
  const query = useSelector(selectSearchQuery);
  const dispatch = useDispatch();
  return (
    <div className="search-bar mt4">
      <h1>Search Movie DB</h1>
      <form>
        <input
          type="text"
          className="w-50"
          value={query}
          onChange={({ target }) => dispatch(setSearchQuery(target.value))}
        ></input>
        <button
          type="submit"
          className="di"
          onClick={(e) => {
            e.preventDefault();
            dispatch(fetchMovies());
          }}
        >
          Search
        </button>
      </form>
      {error && <p>{error}</p>}
      {loading && !data && <SpinnerBox className="db center mt4" />}
    </div>
  );
}
