import { combineReducers } from "redux";
import {
  assessmentPageSlice,
  availableDBQuestionCountSlice,
  batchListSlice,
  enrollListSlice,
  listOfAssessmentPageSlice,
  modulesListSlice,
  questionListSlice,
  schedulePageSlice,
  studentListSlice,
  subTopicsListSlice,
  submitEnrollStudentPageSlice,
  technologiesListSlice,
  technologyPageSlice,
  testListSlice,
  testSelectionPageSlice,
  topicsListSlice,
} from "./root.slice";
import { userSelectionSlice } from "./slice/userSelectionsSlice";
import { enrollStudentSlice } from "./slice/enrollStudent.slice";

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
  batchListReducer: batchListSlice.reducer,
  studentListReducer: studentListSlice.reducer,

  // LOADERS
  /* Assessment-View*/
  listOfAssessmentPageReducer: listOfAssessmentPageSlice.reducer,
  technologyPageReducer: technologyPageSlice.reducer,
  assessmentPageReducer: assessmentPageSlice.reducer,
  schedulePageReducer: schedulePageSlice.reducer,
  /* Enroll-Student */
  testSelectionPageReducer: testSelectionPageSlice.reducer,

  // ACTIONS
  /* Enroll-Student */
  submitEnrollStudentPageReducer: submitEnrollStudentPageSlice.reducer,

  // UTIL
  availableDBQuestionCountReducer: availableDBQuestionCountSlice.reducer,
  userSelectionReducer: userSelectionSlice.reducer,
  enrollStudentReducer: enrollStudentSlice.reducer,
};

const reducers = combineReducers(reducersSlice);

export default reducers;
