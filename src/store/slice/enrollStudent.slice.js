import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // Selected Technology Details
  technology: null,
  // Selected Module Details
  module: null,
  // Selected TestID List
  testIdList: [],
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
      const { testId, batchId } = action.payload;
      if (!testId || !batchId) {
        throw new Error("Must pass valid data to insertBatchId");
      }

      if (!state.testIdList.includes(testId)) {
        state.testIdList.push(testId);
      }

      if (!Array.isArray(state.batchIdList[testId]))
        state.batchIdList[testId] = [];

      if (state.batchIdList[testId].includes(batchId)) {
        console.warn("batchId already exists in the test");
      } else {
        state.batchIdList[testId].push(batchId);
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

        if (state.batchIdList[testId].length === 0) {
          const flag = delete state.batchIdList[testId];

          if (!flag) {
            console.warn("falied to delete testId");
          }
        }
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

      // also add testId and batchId to there lists
      if (!state.testIdList.includes(testId)) state.testIdList.push(testId);
      if (!state.batchIdList[testId]) state.batchIdList[testId] = [];
      if (!state.batchIdList[testId].includes(batchId))
        state.batchIdList[testId].push(batchId);

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

        // if array is empty remove testId and batchId properties.
        if (state.excludedStudents[testId][batchId].length === 0) {
          let flag = delete state.excludedStudents[testId][batchId];
          flag = flag && delete state.excludedStudents[testId];

          if (!flag) {
            console.warn("Deleting testId and batchId failed");
          }
        }
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
