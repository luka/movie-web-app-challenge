import { useDispatch, useSelector } from "react-redux";
import { fetchMovies, selectSearchQuery, setSearchQuery } from "./features";

export function SearchBar() {
  const query = useSelector(selectSearchQuery);
  const dispatch = useDispatch();
  return (
    <div className="mt4">
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
            dispatch(fetchMovies(query));
          }}
        >
          Search
        </button>
      </form>
    </div>
  );
}
