import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { MovieDetails } from "./routes/MovieDetails";
import { MoviesList } from "./routes/MovieList";

function App() {
  return (
    <Router>
      <Switch>
        <Route path={"/:movieId"}>
          <MovieDetails />
        </Route>
        <Route>
          <MoviesList />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
