import { put, call, takeLatest } from "redux-saga/effects";
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
  submitEnrollStudentPageSlice,
  technologiesListSlice,
  technologyPageSlice,
  testListSlice,
  testSelectionPageSlice,
  topicsListSlice,
} from "./root.slice";
import axios from "axios";
import { types } from "./root.actions";

function* technologySaga() {
  try {
    yield put(technologiesListSlice.actions.fetchStart());
    const response = yield call(
      axios.get,
      "https://www.nareshit.net/fetchTechnologies"
    );
    console.log(response);
    yield put(
      technologiesListSlice.actions.fetchSuccess({
        data: response.data,
        statusCode: response.status,
      })
    );
  } catch (error) {
    console.error(error);
    yield put(
      technologiesListSlice.actions.fetchFailure({
        error: error,
        statusCode: error.response.status,
        statusText: error.message,
      })
    );
  }
}

function* moduleSaga(action) {
  try {
    yield put(modulesListSlice.actions.fetchStart());
    const response = yield call(
      axios.get,
      `https://www.nareshit.net/fetchModules/${action.payload}`
    );
    console.log(response);
    yield put(
      modulesListSlice.actions.fetchSuccess({
        data: response.data,
        statusCode: response.status,
      })
    );
  } catch (error) {
    console.error(error);
    yield put(
      modulesListSlice.actions.fetchFailure({
        error: error,
        statusCode: error.response.status,
        statusText: error.message,
      })
    );
  }
}

function* topicSaga(action) {
  try {
    yield put(topicsListSlice.actions.fetchStart());
    const response = yield call(
      axios.get,
      `https://www.nareshit.net/fetchTopics/${action.payload}`
    );
    console.log(response);
    yield put(
      topicsListSlice.actions.fetchSuccess({
        data: response.data,
        statusCode: response.status,
      })
    );
  } catch (error) {
    console.error(error);
    yield put(
      topicsListSlice.actions.fetchFailure({
        error: error,
        statusCode: error.response.status,
        statusText: error.message,
      })
    );
  }
}

function* subTopicSaga(action) {
  try {
    yield put(subTopicsListSlice.actions.fetchStart());
    const response = yield call(
      axios.get,
      `https://www.nareshit.net/fetchSubTopics/${action.payload}`
    );
    console.log(response);
    yield put(
      subTopicsListSlice.actions.fetchSuccess({
        data: response.data,
        statusCode: response.status,
      })
    );
  } catch (error) {
    console.error(error);
    yield put(
      subTopicsListSlice.actions.fetchFailure({
        error: error,
        statusCode: error.response.status,
        statusText: error.message,
      })
    );
  }
}

function* questionSaga(action) {
  try {
    yield put(questionListSlice.actions.fetchStart());
    const response = yield call(
      axios.get,
      `https://www.nareshit.net/fetchFixedQuestions?DifficultyLevelID=${action.payload.DifficultyLevelID}&ModuleID=${action.payload.ModuleID}&TopicID=${action.payload.TopicID}&SubTopicID=${action.payload.SubTopicID}`
    );

    yield put(
      questionListSlice.actions.fetchSuccess({
        data: response.data,
        statusCode: response.status,
      })
    );
  } catch (error) {
    console.error(error);
    yield put(
      questionListSlice.fetchFailure({
        error: error,
        statusCode: error.response.status,
        statusText: error.message,
      })
    );
  }
}

function* enrollListSage(action) {
  console.log(action);
  try {
    yield put(enrollListSlice.actions.fetchStart());
    const response = yield call(
      axios.post,
      "https://www.nareshit.net/CreateNewEnrollId"
    );

    // Log
    console.log(
      "url",
      "https://www.nareshit.net/CreateNewEnrollId",
      "req",
      undefined,
      "res",
      response
    );

    yield put(
      enrollListSlice.actions.fetchSuccess({
        data: response.data.dbresult,
        statusCode: response.status,
      })
    );
  } catch (error) {
    console.error(error);
    yield put(
      enrollListSlice.actions.fetchFailure({
        error: error,
        statusCode: error.response.status,
        statusText: error.message,
      })
    );
  }
}

function* testListSaga(action) {
  try {
    yield put(testListSlice.actions.fetchStart());
    const response = yield call(
      axios.post,
      "https://www.nareshit.net/Listof_AvailableTests",
      {
        TechnologyId: action.payload.technologyId,
        ModuleId: action.payload.moduleId,
      }
    );

    // Log
    console.log(
      "url",
      "https://www.nareshit.net/Listof_AvailableTests",
      "req",
      {
        TechnologyId: action.payload.technologyId,
        ModuleId: action.payload.moduleId,
      },
      "res",
      response
    );

    yield put(
      testListSlice.actions.fetchSuccess({
        data: response.data.dbresult,
        statusCode: response.status,
      })
    );
  } catch (error) {
    console.error(error);
    yield put(
      testListSlice.actions.fetchFailure({
        error: error,
        statusCode: error.response.status,
        statusText: error.message,
      })
    );
  }
}

function* batchListSaga(_) {
  try {
    yield put(batchListSlice.actions.fetchStart());
    const response = yield call(
      axios.post,
      "https://www.nareshit.net/Fetch_Batches",
      {}
    );

    // Log
    console.log(
      "url",
      "https://www.nareshit.net/Fetch_Batches",
      "req",
      {},
      "res",
      response
    );

    yield put(
      batchListSlice.actions.fetchSuccess({
        data: response.data.dbresult,
        statusCode: response.status,
      })
    );
  } catch (error) {
    console.error(error);
    yield put(
      batchListSlice.actions.fetchFailure({
        error: error,
        statusCode: error.response.status,
        statusText: error.message,
      })
    );
  }
}

function* batchDetailsListSaga(action) {
  try {
    yield put(batchDetailsListSlice.actions.fetchStart());
    const response = yield call(
      axios.post,
      "https://www.nareshit.net/Listof_BatchDetails",
      {
        TechnologyId: action.payload.technologyId,
        ModuleId: action.payload.moduleId,
      }
    );

    // Log
    console.log(
      "url",
      "https://www.nareshit.net/Listof_BatchDetails",
      "req",
      {
        TechnologyId: action.payload.technologyId,
        ModuleId: action.payload.moduleId,
      },
      "res",
      response
    );

    yield put(
      batchDetailsListSlice.actions.fetchSuccess({
        data: response.data.dbresult,
        statusCode: response.status,
      })
    );
  } catch (error) {
    console.error(error);
    yield put(
      batchDetailsListSlice.actions.fetchFailure({
        error: error,
        statusCode: error.response.status,
        statusText: error.message,
      })
    );
  }
}

// using tanstack instad of saga
function* studentListSaga(action) {
  try {
    yield put(studentListSlice.actions.fetchStart());
    const response = yield call(
      axios.post,
      "https://www.nareshit.net/GetStudentNameByBatchId",
      {
        TechnologyId: action.payload.technologyId,
        ModuleId: action.payload.moduleId,
      }
    );

    // Log
    console.log(
      "url",
      "https://www.nareshit.net/GetStudentNameByBatchId",
      "req",
      {
        TechnologyId: action.payload.technologyId,
        ModuleId: action.payload.moduleId,
      },
      "res",
      response
    );

    yield put(
      studentListSlice.actions.fetchSuccess({
        data: response.data.dbresult,
        statusCode: response.status,
      })
    );
  } catch (error) {
    console.error(error);
    yield put(
      studentListSlice.actions.fetchFailure({
        error: error,
        statusCode: error.response.status,
        statusText: error.message,
      })
    );
  }
}

function* facultyListSaga(_) {
  try {
    yield put(facultyListSlice.actions.fetchStart());
    const response = yield call(
      axios.post,
      "https://www.nareshit.net/Get_Facaulty"
    );

    // Log
    console.log(
      "url",
      "https://www.nareshit.net/Get_Facaulty",
      "req",
      {},
      "res",
      response
    );

    yield put(
      facultyListSlice.actions.fetchSuccess({
        data: response.data.dbresult,
        statusCode: response.status,
      })
    );
  } catch (error) {
    console.error(error);
    yield put(
      facultyListSlice.actions.fetchFailure({
        error: error,
        statusCode: error.response.status,
        statusText: error.message,
      })
    );
  }
}

function* mentoreListSaga(_) {
  try {
    yield put(mentorListSlice.actions.fetchStart());
    const response = yield call(
      axios.post,
      "https://www.nareshit.net/Get_Mentors"
    );

    // Log
    console.log(
      "url",
      "https://www.nareshit.net/Get_Mentors",
      "req",
      {},
      "res",
      response
    );

    yield put(
      mentorListSlice.actions.fetchSuccess({
        data: response.data.dbresult,
        statusCode: response.status,
      })
    );
  } catch (error) {
    console.error(error);
    yield put(
      mentorListSlice.actions.fetchFailure({
        error: error,
        statusCode: error.response.status,
        statusText: error.message,
      })
    );
  }
}

function* studentListByTechModuleSaga(action) {
  try {
    yield put(studentListByTechModuleSlice.actions.fetchStart());
    const response = yield call(
      axios.post,
      "https://www.nareshit.net/Fetch_Students"
    );

    // Log
    console.log(
      "url",
      "https://www.nareshit.net/Fetch_Students",
      "req",
      {},
      "res",
      response
    );

    yield put(
      studentListByTechModuleSlice.actions.fetchSuccess({
        data: response.data.dbresult,
        statusCode: response.status,
      })
    );
  } catch (error) {
    console.error(error);
    yield put(
      studentListByTechModuleSlice.actions.fetchFailure({
        error: error,
        statusCode: error.response.status,
        statusText: error.message,
      })
    );
  }
}

// LOADERS

function* listOfAssessmentPageSaga() {
  try {
    yield put(listOfAssessmentPageSlice.actions.fetchStart());
    const response = yield call(
      axios.get,
      "https://www.nareshit.net/getAllTests"
    );
    console.log("res", response);
    yield put(
      listOfAssessmentPageSlice.actions.fetchSuccess({
        data: response.data,
        statusCode: response.status,
      })
    );
  } catch (error) {
    console.error(error);
    yield put(
      listOfAssessmentPageSlice.actions.fetchFailure({
        error: error,
        statusCode: error.response.status,
        statusText: error.message,
      })
    );
  }
}

function* technologiesPageSaga(action) {
  try {
    console.log("act", action.payload);
    yield put(technologyPageSlice.actions.fetchStart());
    const response = yield call(
      axios.post,
      "https://www.nareshit.net/getBasicTestInfo",
      { data: { TestID: action.payload } }
    );
    console.log("res", response);
    yield put(
      technologyPageSlice.actions.fetchSuccess({
        data: response.data.data[0],
        statusCode: response.status,
      })
    );
  } catch (error) {
    console.error(error);
    yield put(
      technologyPageSlice.actions.fetchFailure({
        error: error,
        statusCode: error.response.status,
        statusText: error.message,
      })
    );
  }
}

function* assessmentPageSaga(action) {
  try {
    yield put(assessmentPageSlice.actions.fetchStart());
    const response = yield call(
      axios.post,
      "https://www.nareshit.net/getBasicTestDetailsInfo",
      { data: { TestID: action.payload } }
    );
    console.log("res", response);
    yield put(
      assessmentPageSlice.actions.fetchSuccess({
        data: response.data.data[0],
        statusCode: response.status,
      })
    );
  } catch (error) {
    console.error(error);
    yield put(
      assessmentPageSlice.actions.fetchFailure({
        error: error,
        statusCode: error.response.status,
        statusText: error.message,
      })
    );
  }
}

function* schedulePageSaga(action) {
  try {
    yield put(schedulePageSlice.actions.fetchStart());
    const response = yield call(
      axios.post,
      "https://www.nareshit.net/RetriveTestSchedule",
      { TestId: action.payload }
    );
    console.log("res", response);
    yield put(
      schedulePageSlice.actions.fetchSuccess({
        data: response.data.dbresult[0],
        statusCode: response.status,
      })
    );
  } catch (error) {
    console.error(error);
    yield put(
      schedulePageSlice.actions.fetchFailure({
        error: error,
        statusCode: error.response.status,
        statusText: error.message,
      })
    );
  }
}

function* testSelectionPageSaga(action) {
  try {
    yield put(testSelectionPageSlice.actions.fetchStart());
    const response = yield call(
      axios.post,
      "https://www.nareshit.net/Retrive_Enroll",
      {
        EnrollmentId: action.payload,
      }
    );

    // Log
    console.log(
      "url",
      "https://www.nareshit.net/Retrive_Enroll",
      "req",
      {
        EnrollmentId: action.payload,
      },
      "res",
      response
    );

    yield put(
      testSelectionPageSlice.actions.fetchSuccess({
        data: response.data.dbresult,
        statusCode: response.status,
      })
    );
  } catch (error) {
    console.error(error);
    yield put(
      testSelectionPageSlice.actions.fetchFailure({
        error: error,
        statusCode: error.response.status,
        statusText: error.message,
      })
    );
  }
}

// ACTIONS
function* submitEnrollStudentPageSaga(action) {
  try {
    yield put(submitEnrollStudentPageSlice.actions.fetchStart());
    const response = yield call(
      axios.post,
      "https://www.nareshit.net/EnrollTest",
      action.payload
    );

    // Log
    console.log(
      "url",
      "https://www.nareshit.net/EnrollTest",
      "req",
      action.payload,
      "res",
      response
    );

    yield put(
      submitEnrollStudentPageSlice.actions.fetchSuccess({
        data: response.data,
        statusCode: response.status,
      })
    );
  } catch (error) {
    console.error(error);
    yield put(
      submitEnrollStudentPageSlice.actions.fetchFailure({
        error: error,
        statusCode: error.response.status,
        statusText: error.message,
      })
    );
  }
}

function* submitBatchCreationActionSaga(action) {
  try {
    yield put(submitEnrollStudentPageSlice.actions.fetchStart());
    const response = yield call(
      axios.post,
      "https://www.nareshit.net/EnrollTest",
      action.payload
    );

    // Log
    console.log(
      "url",
      "https://www.nareshit.net/EnrollTest",
      "req",
      action.payload,
      "res",
      response
    );

    yield put(
      submitEnrollStudentPageSlice.actions.fetchSuccess({
        data: response.data,
        statusCode: response.status,
      })
    );
  } catch (error) {
    console.error(error);
    yield put(
      submitEnrollStudentPageSlice.actions.fetchFailure({
        error: error,
        statusCode: error.response.status,
        statusText: error.message,
      })
    );
  }
}

// UTIL

function* availableDBQuestionCount(action) {
  try {
    yield put(availableDBQuestionCountSlice.actions.fetchStart());
    const response = yield call(
      axios.post,
      "https://www.nareshit.net/FetchAvailableQuestionsByCount",
      action.payload
    );
    console.log("res", response);
    yield put(
      availableDBQuestionCountSlice.actions.fetchSuccess({
        data: response.data.dbresult,
        statusCode: response.status,
      })
    );
  } catch (error) {
    console.error(error);
    yield put(
      availableDBQuestionCountSlice.actions.fetchFailure({
        error: error,
        statusCode: error.response.status,
        statusText: error.message,
      })
    );
  }
}

// ADMIN

function* adminWatcher() {
  // LISTS
  {
    /* Assessment-View*/
  }
  yield takeLatest(types.TECHNOLOGY_LIST, technologySaga);
  yield takeLatest(types.MODULE_LIST, moduleSaga);
  yield takeLatest(types.TOPIC_LIST, topicSaga);
  yield takeLatest(types.SUBTOPIC_LIST, subTopicSaga);
  yield takeLatest(types.QUESTION_LIST, questionSaga);
  {
    /* Enroll-Student */
  }
  yield takeLatest(types.ENROLL_LIST, enrollListSage);
  yield takeLatest(types.BATCHDETAILS_LIST, batchDetailsListSaga);
  yield takeLatest(types.TEST_LIST, testListSaga);
  yield takeLatest(types.STUDENT_LIST, studentListSaga);
  {
    /* User-Management */
  }

  yield takeLatest(types.BATCH_LIST, batchListSaga);
  yield takeLatest(types.FACULTY_LIST, facultyListSaga);
  yield takeLatest(types.MENTORE_LIST, mentoreListSaga);
  yield takeLatest(
    types.STUDENT_LIST_BY_TECH_MODULE,
    studentListByTechModuleSaga
  );

  // PAGES
  {
    /* Assessment-View*/
  }
  yield takeLatest(types.LISTOFASSESSMENT_PAGE, listOfAssessmentPageSaga);
  yield takeLatest(types.TECHNOLOGY_PAGE, technologiesPageSaga);
  yield takeLatest(types.ASSESSMENT_PAGE, assessmentPageSaga);
  yield takeLatest(types.SCHEDULE_PAGE, schedulePageSaga);
  {
    /* Enroll-Student */
  }
  yield takeLatest(types.TESTSELECTION_PAGE, testSelectionPageSaga);

  // ACTIONS
  {
    /* Enroll-Student */
  }
  yield takeLatest(types.ENROLLSTUDENTS_ACTION, submitEnrollStudentPageSaga);
  {
    /* User-Management */
  }
  yield takeLatest(types.BATCHCREATION_ACTION, submitBatchCreationActionSaga);

  // UTIL
  yield takeLatest(types.AVAILABLEDBQUESTIONCOUNT, availableDBQuestionCount);
}

export default adminWatcher;
