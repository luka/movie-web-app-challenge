import { useSelector } from "react-redux";
import { InfiniteList } from "../components/InfiniteList";
import { selectSearchQuery } from "../features";

export function MoviesList() {
  const query = useSelector(selectSearchQuery);
  return (
    <div className="vh100 movie-list">
      <InfiniteList key={query} />
    </div>
  );
}
