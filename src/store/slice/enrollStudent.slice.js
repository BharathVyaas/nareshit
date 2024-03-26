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
  // Stores Excluded students [testId:batchId:stdentdId]
  excludedStudents: [],

  /** IncludedStudents will be removed use as less as possible */
  // Included students from all Batches includedStudents: {batchId: [...(included students)]}
  includedStudents: {},
};

export const enrollStudentSlice = createSlice({
  name: "enrollStudentInclude", // Renamed from "enrollStudent" to "enrollStudentInclude"
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
      console.log("list", action.payload);
      state.batchIdList = action.payload;
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
    setExcludedArray(state, action) {
      state.excludedStudents = action.payload;
    },
    setIncludedStudents(state, action) {
      console.warn(
        "The 'includedStudents' field is deprecated and will be removed in future versions."
      );

      state.includedStudents = action.payload;
    },
    insertIncludedStudent(state, action) {
      console.warn(
        "The 'includedStudents' field is deprecated and will be removed in future versions."
      );

      const { testId, batchId, studentId } = action.payload;

      if (!testId || !batchId || !studentId) {
        throw new Error("Must pass valid data to insertExcludedStudent");
      }

      // also add testId and batchId to their lists
      if (!state.testIdList.includes(testId)) state.testIdList.push(testId);
      if (!state.batchIdList[testId]) state.batchIdList[testId] = [];
      if (!state.batchIdList[testId].includes(batchId))
        state.batchIdList[testId].push(batchId);

      if (!state.includedStudents[testId]) state.includedStudents[testId] = {};

      if (!Array.isArray(state.includedStudents[testId][batchId]))
        state.includedStudents[testId][batchId] = [];

      if (state.includedStudents[testId][batchId].includes(studentId)) {
        console.warn("studentId already exists in the batch");
      } else {
        state.includedStudents[testId][batchId].push(studentId);
      }
    },
    includeStudentListByBatchId(state, action) {
      console.warn(
        "The 'includedStudents' field is deprecated and will be removed in future versions."
      );

      const { testId, batchId, studentList } = action.payload;

      if (!testId || !batchId || !studentList) {
        throw new Error("Must pass valid data to insertExcludedStudent");
      }

      if (!Array.isArray(studentList)) throw new Error("Not a valid argument");

      // also add testId and batchId to their lists
      if (!state.testIdList.includes(testId)) state.testIdList.push(testId);
      if (!state.batchIdList[testId]) state.batchIdList[testId] = [];
      if (!state.batchIdList[testId].includes(batchId))
        state.batchIdList[testId].push(batchId);

      if (!state.includedStudents[testId]) state.includedStudents[testId] = {};

      state.includedStudents[testId][batchId] = studentList;
    },
    removeStudentFromIncludes(state, action) {
      console.warn(
        "The 'includedStudents' field is deprecated and will be removed in future versions."
      );

      const { testId, batchId, studentId } = action.payload;
      if (!testId || !batchId || !studentId) {
        throw new Error("Must pass valid data to removeStudentFromExcludes");
      }

      if (!state.includedStudents[testId]) state.includedStudents[testId] = {};

      if (!state.includedStudents[testId][batchId]) {
        console.warn(
          "Trying to remove student from batchId that doesn't exists"
        );
      } else {
        if (!state.includedStudents[testId][batchId].includes(studentId))
          console.warn("student doesn't exists in the batch");

        if (!Array.isArray(state.includedStudents[testId][batchId])) {
          console.error("removeStudentFromExcludes:action cannot be performed");
        } else {
          const index =
            state.includedStudents[testId][batchId].indexOf(studentId);

          state.includedStudents[testId][batchId].splice(index, 1);

          // if array is empty remove testId and batchId properties.
          if (state.includedStudents[testId][batchId].length === 0) {
            let flag = delete state.includedStudents[testId][batchId];
            flag = flag && delete state.includedStudents[testId];

            if (!flag) {
              console.warn("Deleting testId and batchId failed");
            }
          }
        }
      }
    },
    removeStudentListByBatchId(state, action) {
      console.warn(
        "The 'includedStudents' field is deprecated and will be removed in future versions."
      );

      const { testId, batchId } = action.payload;

      if (!testId || !batchId) {
        throw new Error("Must pass valid data to insertExcludedStudent");
      }

      let flag;
      if (state.includedStudents[testId])
        flag = delete state.includedStudents[testId];

      if (!flag) {
        console.warn("Coudn't finesh process");
      }
    },
    resetEnrollStudentDetailsSlice(state) {
      state.technology = null;
      state.module = null;
      state.testIdList = [];
      state.batchIdList = {};
      state.includedStudents = {};
      state.excludedStudents = [];
    },
  },
});

export const {
  setTechnology,
  setModule,
  setTestIdList,
  setBatchIdList,
  setIncludedStudents,
  insertIncludedStudent,
  includeStudentListByBatchId,
  insertBatchId,
  removeBatchId,
  setExcludedArray,
  removeStudentFromIncludes,
  removeStudentListByBatchId,
  resetEnrollStudentDetailsSlice,
} = enrollStudentSlice.actions;
