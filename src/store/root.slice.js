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
const testsListSlice = getSlice(types.TEST_LIST);

// LOADERS
{
  /* Assessment-View*/
}
const listOfAssessmentPageSlice = getSlice(types.LISTOFASSESSMENT_PAGE);
const technologyPageSlice = getSlice(types.TECHNOLOGY_PAGE);
const assessmentPageSlice = getSlice(types.ASSESSMENT_PAGE);
const schedulePageSlice = getSlice(types.SCHEDULE_PAGE);

// UTIL
const availableDBQuestionCountSlice = getSlice(types.AVAILABLEDBQUESTIONCOUNT);

export {
  technologiesListSlice,
  modulesListSlice,
  topicsListSlice,
  subTopicsListSlice,
  questionListSlice,
  testsListSlice,
};
export {
  listOfAssessmentPageSlice,
  technologyPageSlice,
  assessmentPageSlice,
  schedulePageSlice,
};
export { availableDBQuestionCountSlice };
