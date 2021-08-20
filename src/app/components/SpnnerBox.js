export function SpinnerBox({ height = "100px", center = true }) {
  return (
    <div className="flex center-m mt4">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 50 50"
        className="svg-icon spinner-icon"
        aria-hidden="true"
        focusable="false"
        fill="currentColor"
      >
        <circle
          className="path"
          cx="25"
          cy="25"
          r="20"
          fill="none"
          strokeWidth="5"
        ></circle>
      </svg>
    </div>
  );
}
