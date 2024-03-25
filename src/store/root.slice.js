import getSlice from "./root.utility";
import { types } from "./root.actions";

// LISTS
{
  /* Assessment-View*/
}
const technologiesListSlice = getSlice(types.TECHNOLOGY_LIST);
const modulesListSlice = getSlice(types.MODULE_LIST);
const topicsListSlice = getSlice(types.TOPIC_LIST);
const subTopicsListSlice = getSlice(types.SUBTOPIC_LIST);
const questionListSlice = getSlice(types.QUESTION_LIST);
{
  /* Enroll-Student */
}
const testListSlice = getSlice(types.TEST_LIST);
const batchListSlice = getSlice(types.BATCH_LIST);
const studentListSlice = getSlice(types.STUDENT_LIST);
const enrollListSlice = getSlice(types.ENROLL_LIST);

// LOADERS
{
  /* Assessment-View*/
}
const listOfAssessmentPageSlice = getSlice(types.LISTOFASSESSMENT_PAGE);
const technologyPageSlice = getSlice(types.TECHNOLOGY_PAGE);
const assessmentPageSlice = getSlice(types.ASSESSMENT_PAGE);
const schedulePageSlice = getSlice(types.SCHEDULE_PAGE);
{
  /* Enroll-Student */
}
const testSelectionPageSlice = getSlice(types.TESTSELECTION_PAGE);

// ACTIONS
{
  /* Enroll-Student */
}
const submitEnrollStudentPageSlice = getSlice(types.ENROLLSTUDENTS_ACTION);

// UTIL
const availableDBQuestionCountSlice = getSlice(types.AVAILABLEDBQUESTIONCOUNT);

export {
  technologiesListSlice,
  modulesListSlice,
  topicsListSlice,
  subTopicsListSlice,
  questionListSlice,
  enrollListSlice,
  testListSlice,
  batchListSlice,
  studentListSlice,
};
export {
  listOfAssessmentPageSlice,
  technologyPageSlice,
  assessmentPageSlice,
  schedulePageSlice,
  testSelectionPageSlice,
};
export { submitEnrollStudentPageSlice };
export { availableDBQuestionCountSlice };
