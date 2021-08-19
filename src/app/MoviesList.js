import { useSelector } from "react-redux";
import { selectMovies, selectMoviesStatus } from "./features";
import { SpinnerBox } from "./SpnnerBox";

export function ArrowRightIcon() {
  return (
    <svg
      className="svg-icon"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      fill="currentColor"
    >
      <path d="M0 0h24v24H0V0z" fill="none" />
      <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
    </svg>
  );
}

function MovieListItem({ Title, Year, Poster, imdbID }) {
  return (
    <div className="flex center-x mt3">
      {/* 300x448 */}
      <img
        width="75"
        height="112"
        src={Poster}
        loading="lazy"
        alt="Movie poster"
      />
      <div className="ml3">
        <span className="f6">{Year}</span>
        <h2 className="mt2 f4">{Title}</h2>
      </div>
      <button
        className="button button--text icon-only-button"
        style={{ width: "2em", height: "2em", marginLeft: "auto" }}
      >
        <ArrowRightIcon />
      </button>
    </div>
  );
}

export function MoviesList() {
  const { loading, error } = useSelector(selectMoviesStatus);
  const movies = useSelector(selectMovies);
  return loading ? (
    <SpinnerBox />
  ) : error ? (
    <p>{error}</p>
  ) : (
    <ul className="mt3">
      {movies.map((m) => (
        <li key={m.imdbID}>
          <MovieListItem {...m} />
        </li>
      ))}
    </ul>
  );
}
