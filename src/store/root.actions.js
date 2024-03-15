import { userSelectionSlice } from "./slice/userSelectionsSlice";

export const types = {
  TECHNOLOGY_LIST: "technologylist",
  MODULE_LIST: "modulelist",
  TOPIC_LIST: "topiclist",
  SUBTOPIC_LIST: "subtopiclist",
  QUESTION_LIST: "questionlist",

  // PAGES
  LISTOFASSESSMENT_PAGE: "listofassessmentpage",
  TECHNOLOGY_PAGE: "technologypage",
  ASSESSMENT_PAGE: "assessmentpage",
  SCHEDULE_PAGE: "schedulepage",

  // UTIL
  /**
   * In Question View Getting DB Count for each selected combination from backend to show DBCount column in Question View Edit Modal table.
   */
  AVAILABLEDBQUESTIONCOUNT: "availabledbquestioncount",
};

export const fetchAssessmentList = () => {
  return {
    type: types.LISTOFASSESSMENT_PAGE,
  };
};

export const fetchTechnologyList = () => {
  return {
    type: types.TECHNOLOGY_LIST,
  };
};

export const fetchModuleList = (payload) => {
  return {
    type: types.MODULE_LIST,
    payload,
  };
};

export const fetchTopicList = (payload) => {
  return {
    type: types.TOPIC_LIST,
    payload,
  };
};

export const fetchSubTopicList = (payload) => {
  return {
    type: types.SUBTOPIC_LIST,
    payload,
  };
};

//  PAGES

export const fetchAssessmentPageDetails = (payload) => {
  return {
    type: types.ASSESSMENT_PAGE,
    payload,
  };
};

export const fetchTechnologyPageDetails = (payload) => {
  return {
    type: types.TECHNOLOGY_PAGE,
    payload,
  };
};
export const userSelectionAction = userSelectionSlice.actions;
