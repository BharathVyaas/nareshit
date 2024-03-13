import { combineReducers } from "redux";
import { technologiesListSlice } from "./root.slice";

const reducersSlice = {
  technologiesListReducer: technologiesListSlice.reducer,
};

const reducers = combineReducers(reducersSlice);

export default reducers;