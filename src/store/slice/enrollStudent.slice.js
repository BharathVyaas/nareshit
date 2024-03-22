import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // Selected Technology Details
  technology: null,
  // Selected Module Details
  module: null,
  // Selected TestID List
  testIdList: null,
  // Selected BatchID List {testId: [...batchId]}
  batchIdList: {},
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
    insertBatchId(state, action) {
      if (!action.payload.testId || !action.payload.batchId) {
        throw new Error("Must pass valid data to insertBatchId");
      }

      if (!Array.isArray(state.batchIdList[action.payload.testId]))
        state.batchIdList[action.payload.testId] = [];

      if (
        state.batchIdList[action.payload.testId].includes(
          action.payload.batchId
        )
      ) {
        console.warn("batchId already exists in the test");
      } else {
        state.batchIdList[action.payload.testId].push(action.payload.batchId);
      }
    },
    removeBatchId(state, action) {
      const { testId, batchId } = action.payload;

      if (!testId || !batchId) {
        throw new Error("Must pass valid data to insertBatchId");
      }

      if (!state.batchIdList[testId].includes(batchId)) {
        console.warn("batchId with this testId doesn't");
      }

      if (!Array.isArray(state.batchIdList[testId])) {
        console.error("removeBatchId:action cannot be performed");
      } else {
        const index = state.batchIdList[testId].indexOf(batchId);

        state.batchIdList[testId].splice(index, 1);
      }
    },
    excludedStudents(state, action) {
      state.excludedStudents = action.payload;
    },
    insertExcludedStudent(state, action) {
      const { testId, batchId, studentId } = action.payload;

      if (!testId || !batchId || !studentId) {
        throw new Error("Must pass valid data to insertExcludedStudent");
      }

      if (!state.excludedStudents[testId]) state.excludedStudents[testId] = {};

      if (!Array.isArray(state.excludedStudents[testId][batchId]))
        state.excludedStudents[testId][batchId] = [];

      if (state.excludedStudents[testId][batchId].includes(studentId)) {
        console.warn("studentId already exists in the batch");
      } else {
        state.excludedStudents[testId][batchId].push(studentId);
      }
    },
    removeStudentFromExcludes(state, action) {
      const { testId, batchId, studentId } = action.payload;
      if (!testId || !batchId || !studentId) {
        throw new Error("Must pass valid data to removeStudentFromExcludes");
      }

      if (!state.excludedStudents[testId]) state.excludedStudents[testId] = {};

      if (!state.excludedStudents[testId][batchId].includes(studentId))
        console.warn("sutdent dosen't exists in the batch");

      if (!Array.isArray(state.excludedStudents[testId][batchId])) {
        console.error("removeStudentFromExcludes:action cannot be performed");
      } else {
        const index =
          state.excludedStudents[testId][batchId].indexOf(studentId);

        state.excludedStudents[testId][batchId].splice(index, 1);
      }
    },
  },
});

export const {
  setTechnology,
  setModule,
  setTestIdList,
  setBatchIdList,
  excludedStudents,
  insertExcludedStudent,
  insertBatchId,
  removeBatchId,
  removeStudentFromExcludes,
} = enrollStudentSlice.actions;
