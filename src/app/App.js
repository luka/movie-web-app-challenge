import { Switch, Route } from "react-router-dom";
import { MovieDetails } from "./routes/MovieDetails";
import { MoviesList } from "./routes/MovieList";

function App({ List = MoviesList }) {
  return (
    <Switch>
      <Route path={"/:movieId"}>
        <MovieDetails />
      </Route>
      <Route>
        <List />
      </Route>
    </Switch>
  );
}

export default App;
