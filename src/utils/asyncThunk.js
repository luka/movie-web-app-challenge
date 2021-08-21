export function fetchStart(state, _action) {
  return {
    ...state,
    loading: true,
    error: null,
  };
}
export function fetchSuccess(state, action) {
  return {
    ...state,
    loading: false,
    data: action.payload,
    error: null,
  };
}
export function fetchError(state, action) {
  return {
    ...state,
    data: undefined,
    loading: false,
    error: action.payload,
  };
}
