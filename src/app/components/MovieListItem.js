import { Link } from "react-router-dom";
import { ArrowRightIcon } from "./ArrowRightIcon";
import { MoviePoster } from "./MoviePoster";

export function MovieListItem({ Title, Year, Poster, imdbID }) {
  return (
    <Link to={`/${imdbID}`}>
      <div className="flex center-x" style={{ minHeight: "112px" }}>
        <MoviePoster url={Poster} />
        <div className="ml3">
          <span className="f6">{Year}</span>
          <h2 className="mt2 f5">{Title}</h2>
        </div>
        <button
          className="button button--text icon-only-button"
          style={{ width: "2em", height: "2em", marginLeft: "auto" }}
        >
          <ArrowRightIcon />
        </button>
      </div>
    </Link>
  );
}
