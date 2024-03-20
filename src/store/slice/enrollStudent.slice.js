import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // Selected Technology Details
  technology: null,
  // Selected Module Details
  module: null,
  // Selected TestID List
  testIdList: null,
  // Selected BatchID List
  batchIdList: null,
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
    setTestIdList(state, action) {
      state.testIdList = action.payload;
    },
    setBatchIdList(state, action) {
      state.batchId = action.payload;
    },
    excludedStudents(state, action) {
      state.excludedStudents = action.payload;
    },
  },
});

export const {
  setTechnology,
  setModule,
  setTestIdList,
  setBatchIdList,
  excludedStudents,
} = enrollStudentSlice.actions;
