import { createSlice } from "@reduxjs/toolkit";

const today = new Date();
const todayISOString = today.toISOString().substring(0, 10);

const initialState = {
  // Input Field
  batchName: "",
  //
  technologyId: 0,
  //
  moduleId: 0,
  // input field optional
  batchAdmin: "",
  // Batch start date
  startDate: todayISOString,
  // Batch end date
  endDate: todayISOString,
  // Faculty id comma separated
  facultyId: [],
  // mentor id's comma separated
  mentorId: [],
  // included students from table [{ "FirstName": "abc","LastName": "xyz","Email": "abc@gmail.com","PhoneNumber": "991252","BatchName":"batch1"}]
  includedStudents: [],
};

const userManagementSlice = createSlice({
  name: "userManagement",
  initialState,
  reducers: {
    setBatchName(state, action) {
      state.batchName = action.payload;
    },
    setBatchAdmin(state, action) {
      state.batchAdmin = action.payload;
    },
    setTechnologyId(state, action) {
      state.technologyId = action.payload;
    },
    setModuleId(state, action) {
      state.moduleId = action.payload;
    },
    setStartDate(state, action) {
      state.startDate = action.payload;
    },
    setEndDate(state, action) {
      state.endDate = action.payload;
    },
    setFaculityId(state, action) {
      state.facultyId = action.payload;
    },
    setMentorId(state, action) {
      state.mentorId = action.payload;
    },
    setIncludedStudentsArr(state, action) {
      state.includedStudents = action.payload;
    },
  },
});

export const {
  setBatchName,
  setBatchAdmin,
  setTechnologyId,
  setModuleId,
  setStartDate,
  setEndDate,
  setFaculityId,
  setMentorId,
  setIncludedStudentsArr,
} = userManagementSlice.actions;

export default userManagementSlice;
