import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  //
  isLoading: false,
  // if refetching current data is stale
  stale: false,
  // true if if data is loading and if rejucted
  isPending: false,
  // holds data returned by response
  data: {},
  // response status
  statusCode: null,
  // response status text
  statusText: "",
  // data resolved successfully
  isSuccess: false,
  //
  isError: false,
  // holds error object
  error: false,
  // state is resolved | rejucted
  state: "resolved",
};

function getSlice(name) {
  return createSlice({
    name,
    initialState,
    reducers: {
      // loading started
      fetchStart(state) {
        state.isLoading = true;
        state.stale = true;
        state.statusText = "";
        state.isPending = true;
        state.isError = false;
        state.statusCode = 0;
        state.state = "pending";
      },
      // fetch resolved
      fetchSuccess(state, action) {
        state.data = action.payload.data;
        state.statusCode = action.payload.statusCode || 0;
        state.statusText = action.payload.statusText || "";
        state.isPending = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.stale = false;
        state.state = "resolved";
      },
      //
      fetchFailure(state, action) {
        state.isError = true;
        state.error = action.payload.error || {};
        state.statusCode = action.payload.statusCode || 0;
        state.statusText = action.payload.statusText || "";
        state.isSuccess = false;
        state.isLoading = false;
        state.state = "rejucted";
      },
    },
  });
}

export default getSlice;