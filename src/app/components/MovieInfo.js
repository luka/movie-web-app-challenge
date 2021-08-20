function renderRatings(a) {
  return (
    <ul className="ml3">
      {a.map(({ Source, Value }) => (
        <li key={Source}>
          {Source} - {Value}
        </li>
      ))}
    </ul>
  );
}

export function MovieInfo({ data }) {
  return Object.entries(data).map(([k, v]) => (
    <div key={k} className="mt4">
      {k}:{" "}
      <strong>
        {k === "Ratings"
          ? renderRatings(v)
          : typeof v === "object"
          ? JSON.stringify(v)
          : v}
      </strong>
    </div>
  ));
}
