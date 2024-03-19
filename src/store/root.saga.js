import { put, call, takeLatest } from "redux-saga/effects";
import { assessmentPageSlice, availableDBQuestionCountSlice, listOfAssessmentPageSlice, modulesListSlice, questionListSlice, schedulePageSlice, subTopicsListSlice, technologiesListSlice, technologyPageSlice, topicsListSlice } from "./root.slice";
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
        error,
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
        error,
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
        error,
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
        error,
        statusCode: error.response.status,
        statusText: error.message,
      })
    );
  }
}

function* questionSaga(action){
  try{
    yield put(questionListSlice.actions.fetchStart())
    const response = yield call(axios.get, `https://www.nareshit.net/fetchFixedQuestions?DifficultyLevelID=${action.payload.DifficultyLevelID}&ModuleID=${action.payload.ModuleID}&TopicID=${action.payload.TopicID}&SubTopicID=${action.payload.SubTopicID}`)

    yield put(questionListSlice.actions.fetchSuccess({
      data: response.data,
      statusCode: response.status,
    }))
  }catch(error){
    console.error(error)
    yield put(questionListSlice.fetchFailure({
      error,
      statusCode: error.response.status,
      statusText: error.message,
    }))
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
    console.log('res',response);
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
        error,
        statusCode: error.response.status,
        statusText: error.message,
      })
    );
  }
}

function* technologiesPageSaga(action) {
  
  try {
    yield put(technologyPageSlice.actions.fetchStart());
    const response = yield call(
      axios.post,
      "https://www.nareshit.net/getBasicTestInfo", {data:{TestID: action.payload}}
    );
    console.log('res',response);
    yield put(
      technologyPageSlice.actions.fetchSuccess({
        data: response.data.data,
        statusCode: response.status,
      })
    );
  } catch (error) {
    console.error(error);
    yield put(
      technologyPageSlice.actions.fetchFailure({
        error,
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
      "https://www.nareshit.net/getBasicTestDetailsInfo", {data:{TestID: action.payload}}
    );
    console.log('res',response);
    yield put(
      assessmentPageSlice.actions.fetchSuccess({
        data: response.data.data,
        statusCode: response.status,
      })
    );
  } catch (error) {
    console.error(error);
    yield put(
      assessmentPageSlice.actions.fetchFailure({
        error,
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
      "https://www.nareshit.net/RetriveTestSchedule", {TestId: action.payload}
    );
    console.log('res',response);
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
        error,
        statusCode: error.response.status,
        statusText: error.message,
      })
    );
  }
}

// UTIL

function* availableDBQuestionCount(action){
  try {
    yield put(availableDBQuestionCountSlice.actions.fetchStart());
    const response = yield call(
      axios.post,
      "https://www.nareshit.net/FetchAvailableQuestionsByCount", action.payload
    );
    console.log('res',response);
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
        error,
        statusCode: error.response.status,
        statusText: error.message,
      })
    );
  }

}

// ADMIN

function* adminWatcher() {
  yield takeLatest(`fetch/${types.TECHNOLOGY_LIST}`, technologySaga);
  yield takeLatest(`fetch/${types.MODULE_LIST}`, moduleSaga);
  yield takeLatest(`fetch/${types.TOPIC_LIST}`, topicSaga);
  yield takeLatest(`fetch/${types.SUBTOPIC_LIST}`, subTopicSaga);
  yield takeLatest(`fetch/${types.QUESTION_LIST}`, questionSaga)

  // PAGES
  yield takeLatest(`fetch/${types.LISTOFASSESSMENT_PAGE}`, listOfAssessmentPageSaga)
  yield takeLatest(`fetch/${types.TECHNOLOGY_PAGE}`, technologiesPageSaga)
  yield takeLatest(`fetch/${types.ASSESSMENT_PAGE}`, assessmentPageSaga)
  yield takeLatest(`fetch/${types.SCHEDULE_PAGE}`, schedulePageSaga)

  // UTIL
  yield takeLatest(`fetch/${types.AVAILABLEDBQUESTIONCOUNT}`, availableDBQuestionCount)
}

export default adminWatcher;