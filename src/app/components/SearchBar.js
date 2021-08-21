import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies, selectMoviesStatus, setSearchQuery } from "../features";
import { ErrorBox } from "./ErrorBox";
import { SpinnerBox } from "./SpnnerBox";

export function SearchBar() {
  const { loading, error, data, query } = useSelector(selectMoviesStatus);
  const ref = useRef();
  const dispatch = useDispatch();
  return (
    <div className="search-bar mt4">
      <h1>Search Movie DB</h1>
      <form>
        <input
          type="text"
          className="w-50"
          defaultValue={query}
          ref={ref}
        ></input>
        <button
          type="submit"
          className="di"
          onClick={(e) => {
            e.preventDefault();
            if (ref.current.value.length > 0) {
              dispatch(setSearchQuery(ref.current.value));
              dispatch(fetchMovies());
            }
          }}
        >
          Search
        </button>
      </form>
      {error && <ErrorBox error={error} />}
      {loading && !data && <SpinnerBox />}
    </div>
  );
}
