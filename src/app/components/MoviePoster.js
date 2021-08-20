export function MoviePoster({
  url,
  width = "75px",
  height = "112px",
  placeholder = true,
}) {
  return url && url.startsWith("http") ? (
    <div className="movie-poster ">
      {/* original 300x448 */}
      <img
        width={width}
        height={height}
        src={url}
        loading="lazy"
        alt="Movie poster"
      />
    </div>
  ) : placeholder ? (
    <div className="movie-poster debug " style={{ width, height }} />
  ) : null;
}
