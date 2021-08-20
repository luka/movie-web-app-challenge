import { forwardRef, memo } from "react";
import { isLast } from "../../utils/toolkit";
import { MovieListItem } from "./MovieListItem";

import { SpinnerBox } from "./SpnnerBox";

export const InfiniteListRow = memo(
  forwardRef(({ index, style, data }, ref) => {
    const { items, Header, hasNext } = data;
    let idx = index - 1; // idx = index - 1  because we have header row
    let row = null;
    if (index === 0) row = <Header />;
    else if (isLast(items, idx - 1) && hasNext)
      row = <SpinnerBox className="db center mt4" />;
    else row = <MovieListItem {...items[idx]} />;

    return (
      <div ref={ref} style={style} className="list-row">
        <div className="column center">{row}</div>
      </div>
    );
  })
);
