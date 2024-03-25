import { userSelectionSlice } from "./slice/userSelectionsSlice";

export const types = {
  // Assessment-View
  TECHNOLOGY_LIST: "technologylist",
  MODULE_LIST: "modulelist",
  TOPIC_LIST: "topiclist",
  SUBTOPIC_LIST: "subtopiclist",
  QUESTION_LIST: "questionlist",
  // Enroll-Student
  TEST_LIST: "listoftests",
  BATCH_LIST: "listofbatches",
  STUDENT_LIST: "listofstudent",
  ENROLL_LIST: "enrolllist",

  // PAGES

  // Assessment-View
  LISTOFASSESSMENT_PAGE: "listofassessmentpage",
  TECHNOLOGY_PAGE: "technologypage",
  ASSESSMENT_PAGE: "assessmentpage",
  SCHEDULE_PAGE: "schedulepage",
  // ENROLL-STUDENTS
  TESTSELECTION_PAGE: "testselectionpage",

  // ACTIONS

  // ENROLL-STUDENTS
  ENROLLSTUDENTS_ACTION: "enrollstudentsaction",

  // UTIL
  /**
   * In Question View Getting DB Count for each selected combination from backend to show DBCount column in Question View Edit Modal table.
   */
  AVAILABLEDBQUESTIONCOUNT: "availabledbquestioncount",
};

// LISTS
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

export const fetchTestList = (payload) => {
  return {
    type: types.TEST_LIST,
    payload,
  };
};

export const fetchBatchList = (payload) => {
  return {
    type: types.BATCH_LIST,
    payload,
  };
};

export const fetchStudentList = (payload) => {
  return {
    type: types.STUDENT_LIST,
    payload,
  };
};

export const fetchEnrollList = (payload) => {
  return {
    type: types.ENROLL_LIST,
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

export const retriveTestSelectionPageDetails = (payload) => {
  return {
    type: types.TESTSELECTION_PAGE,
    payload,
  };
};

export const submitEnrollStudentPage = (payload) => {
  return {
    type: types.ENROLLSTUDENTS_ACTION,
    payload,
  };
};

export const userSelectionAction = userSelectionSlice.actions;
