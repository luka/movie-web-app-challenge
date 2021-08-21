import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouteMatch, useHistory } from "react-router-dom";
import { useMakeSelector } from "../../utils/hooks";
import { emptyObj } from "../../utils/toolkit";
import { ErrorBox } from "../components/ErrorBox";
import { MovieInfo } from "../components/MovieInfo";
import { MoviePoster } from "../components/MoviePoster";
import { SpinnerBox } from "../components/SpnnerBox";
import {
  fetchMovieDetails,
  makeSelectDetails,
  makeSelectMovie,
  selectDetailsStatus,
} from "../features";

export function MovieDetails() {
  const { loading = true, error } = useSelector(selectDetailsStatus);
  const {
    params: { movieId },
  } = useRouteMatch();
  const header = useMakeSelector(makeSelectMovie(), movieId) || {};
  const details = useMakeSelector(makeSelectDetails(), movieId) || {};
  const movie = { ...header, ...details };
  const { Title, Year, Poster, ...movieData } = movie;

  let history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchMovieDetails(movieId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="column center movie-details">
      <button className="mt4" onClick={history.goBack}>
        Back
      </button>
      {!emptyObj(movie) && (
        <div>
          <p>{Year}</p>
          <h1 className="mt2">{Title}</h1>
          <div className="mt4">
            <MoviePoster
              url={Poster}
              width="150px"
              height="224px"
              placeholder={false}
            />
          </div>
          <MovieInfo data={movieData} />
        </div>
      )}
      {error && <ErrorBox error={error} />}
      {loading && <SpinnerBox />}
    </div>
  );
}
