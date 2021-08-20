import { useDispatch, useSelector } from "react-redux";
import AutoSizer from "react-virtualized-auto-sizer";
import InfiniteLoader from "react-window-infinite-loader";
import { DynamicSizeList } from "react-window-dynamic";
import { noop } from "../../utils/toolkit";
import { fetchMovies, selectMoviesStatus } from "../features";
import { SearchBar } from "./SearchBar";
import { InfiniteListRow } from "./InfiniteListRow";

export function InfiniteList() {
  const { loading, data = {} } = useSelector(selectMoviesStatus);
  const { items = [], pagination = {} } = data;
  const { next_page } = pagination;
  // items.length + 1 because we have title row
  const slotsCount = items.length + 1;
  const itemCount = next_page ? slotsCount + 1 : slotsCount;
  const isItemLoaded = (index) => !next_page || index < slotsCount;
  const dispatch = useDispatch();
  const loadMore = loading ? noop : () => dispatch(fetchMovies(next_page));

  return (
    <InfiniteLoader
      isItemLoaded={isItemLoaded}
      itemCount={itemCount}
      loadMoreItems={loadMore}
    >
      {({ onItemsRendered, ref }) => (
        <AutoSizer disableWidth className="autosizer" ref={ref}>
          {({ height }) => (
            <DynamicSizeList
              itemData={{
                items,
                Header: SearchBar,
                hasNext: !!next_page,
              }}
              height={height}
              itemCount={itemCount}
              onItemsRendered={onItemsRendered}
              estimatedItemSize={10}
            >
              {InfiniteListRow}
            </DynamicSizeList>
          )}
        </AutoSizer>
      )}
    </InfiniteLoader>
  );
}
