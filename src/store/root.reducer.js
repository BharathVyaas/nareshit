import { combineReducers } from "redux";
import {
  assessmentPageSlice,
  availableDBQuestionCountSlice,
  batchDetailsListSlice,
  batchListSlice,
  enrollListSlice,
  facultyListSlice,
  listOfAssessmentPageSlice,
  mentorListSlice,
  modulesListSlice,
  questionListSlice,
  schedulePageSlice,
  studentListByTechModuleSlice,
  studentListSlice,
  subTopicsListSlice,
  submitBatchCreationActionSlice,
  submitEnrollStudentPageSlice,
  technologiesListSlice,
  technologyPageSlice,
  testListSlice,
  testSelectionPageSlice,
  topicsListSlice,
  userSelectionPageSlice,
} from "./root.slice";
import { userSelectionSlice } from "./slice/userSelectionsSlice";
import { enrollStudentSlice } from "./slice/enrollStudent.slice";
import userManagementSlice from "./slice/userManagement.slice";

const reducersSlice = {
  // LISTS
  /* Assessment-View*/
  technologiesListReducer: technologiesListSlice.reducer,
  modulesListReducer: modulesListSlice.reducer,
  topicsListReducer: topicsListSlice.reducer,
  subTopicsListReducer: subTopicsListSlice.reducer,
  questionListReducer: questionListSlice.reducer,
  /* Enroll-Student */
  enrollListReducer: enrollListSlice.reducer,
  testListReducer: testListSlice.reducer,
  batchDetailsListReducer: batchDetailsListSlice.reducer,
  studentListReducer: studentListSlice.reducer,
  /* User-Management */
  facultyListReducer: facultyListSlice.reducer,
  mentorListReducer: mentorListSlice.reducer,
  batchListReducer: batchListSlice.reducer,
  studentListByTechModuleReducer: studentListByTechModuleSlice.reducer,

  // LOADERS
  /* Assessment-View*/
  listOfAssessmentPageReducer: listOfAssessmentPageSlice.reducer,
  technologyPageReducer: technologyPageSlice.reducer,
  assessmentPageReducer: assessmentPageSlice.reducer,
  schedulePageReducer: schedulePageSlice.reducer,
  /* Enroll-Student */
  testSelectionPageReducer: testSelectionPageSlice.reducer,
  /* User-Management */
  userManagementPageReducer: userManagementSlice.reducer,

  // ACTIONS
  /* Enroll-Student */
  submitEnrollStudentPageReducer: submitEnrollStudentPageSlice.reducer,
  /* User-Management */
  submitBatchCreationActionReducer: submitBatchCreationActionSlice.reducer,

  // UTIL
  availableDBQuestionCountReducer: availableDBQuestionCountSlice.reducer,
  userSelectionReducer: userSelectionSlice.reducer,
  enrollStudentReducer: enrollStudentSlice.reducer,
};

const reducers = combineReducers(reducersSlice);

export default reducers;
