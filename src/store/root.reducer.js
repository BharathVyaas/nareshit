import { combineReducers } from "redux";
import {
  assessmentPageSlice,
  availableDBQuestionCountSlice,
  batchListSlice,
  listOfAssessmentPageSlice,
  modulesListSlice,
  questionListSlice,
  schedulePageSlice,
  studentListSlice,
  subTopicsListSlice,
  technologiesListSlice,
  technologyPageSlice,
  testListSlice,
  topicsListSlice,
} from "./root.slice";
import { userSelectionSlice } from "./slice/userSelectionsSlice";

const reducersSlice = {
  // LISTS
  /* Assessment-View*/
  technologiesListReducer: technologiesListSlice.reducer,
  modulesListReducer: modulesListSlice.reducer,
  topicsListReducer: topicsListSlice.reducer,
  subTopicsListReducer: subTopicsListSlice.reducer,
  questionListReducer: questionListSlice.reducer,
  /* Enroll-Student */
  testListReducer: testListSlice.reducer,
  batchListReducer: batchListSlice.reducer,
  studentListReducer: studentListSlice.reducer,

  // LOADERS
  listOfAssessmentPageReducer: listOfAssessmentPageSlice.reducer,
  technologyPageReducer: technologyPageSlice.reducer,
  assessmentPageReducer: assessmentPageSlice.reducer,
  schedulePageReducer: schedulePageSlice.reducer,

  // UTIL
  availableDBQuestionCountReducer: availableDBQuestionCountSlice.reducer,
  userSelectionReducer: userSelectionSlice.reducer,
};

const reducers = combineReducers(reducersSlice);

export default reducers;
