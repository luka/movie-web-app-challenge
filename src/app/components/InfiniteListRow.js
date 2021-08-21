import { forwardRef, memo } from "react";
import { isLast } from "../../utils/toolkit";
import { ErrorBox } from "./ErrorBox";
import { MovieListItem } from "./MovieListItem";

import { SpinnerBox } from "./SpnnerBox";

export const InfiniteListRow = memo(
  forwardRef(({ index, style, data }, ref) => {
    const { items, Header, hasNext, error } = data;
    const idx = index - 1; // idx = index - 1  because we have header row

    return (
      <div ref={ref} style={style} className="list-row">
        <div className="column center">
          {index === 0 ? (
            <Header />
          ) : isLast(items, idx - 1) && hasNext ? (
            error ? (
              <ErrorBox error={error} />
            ) : (
              <SpinnerBox />
            )
          ) : (
            <MovieListItem {...items[idx]} />
          )}
        </div>
      </div>
    );
  })
);
