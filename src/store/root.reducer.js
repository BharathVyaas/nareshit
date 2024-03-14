import { combineReducers } from "redux";
import { assessmentPageSlice, availableDBQuestionCountSlice, listOfAssessmentPageSlice, modulesListSlice, questionListSlice, schedulePageSlice, subTopicsListSlice, technologiesListSlice, technologyPageSlice, topicsListSlice } from "./root.slice";

const reducersSlice = {
  technologiesListReducer: technologiesListSlice.reducer,
  modulesListReducer: modulesListSlice.reducer,
  topicsListReducer: topicsListSlice.reducer,
  subTopicsListReducer: subTopicsListSlice.reducer,
  questionListReducer: questionListSlice.reducer,

  // LOADERS
  listOfAssessmentPageReducer: listOfAssessmentPageSlice.reducer,
  technologyPageReducer: technologyPageSlice.reducer,
  assessmentPageReducer: assessmentPageSlice.reducer,
  schedulePageReducer: schedulePageSlice.reducer,

  // UTIL
  availableDBQuestionCountReducer: availableDBQuestionCountSlice.reducer
};

const reducers = combineReducers(reducersSlice);

export default reducers;