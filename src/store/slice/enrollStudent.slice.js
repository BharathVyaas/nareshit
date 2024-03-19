import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // Selected Technology Details
  technology: null,
  // Selected Module Details
  module: null,
  // Current TestID
  testId: null,
  // SCurrent BatchID
  batchId: null,
  // Excluded students from all Batches excludedStudents: {batchId: [...(excluded students)]}
  excludedStudents: {},
};

export const enrollStudentSlice = createSlice({
  name: "enrollStudent",
  initialState,
  reducers: {
    setTechnology(state, action) {
      state.technology = action.payload;
    },
    setModule(state, action) {
      state.module = action.payload;
    },
    setTestId(state, action) {
      state.testId = action.payload;
    },
    setBatchId(state, action) {
      state.batchId = action.payload;
    },
    excludedStudents(state, action) {
      state.excludedStudents = action.payload;
    },
  },
});
