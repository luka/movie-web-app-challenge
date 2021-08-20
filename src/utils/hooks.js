import { useCallback } from "react";
import { useSelector } from "react-redux";

export function useMakeSelector(factory, ...params) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const selector = useCallback(factory, params);
  return useSelector((state) => selector(state, ...params));
}
