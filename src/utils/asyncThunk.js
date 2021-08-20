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

export function asyncThunkReducers(thunk) {
  return {
    [thunk.pending]: fetchStart,
    [thunk.fulfilled]: fetchSuccess,
    [thunk.rejected]: fetchError,
  };
}

export function tryAsync(apiFn) {
  return async function asyncThunk(data, thunkApi) {
    try {
      return await apiFn(data, thunkApi);
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  };
}
