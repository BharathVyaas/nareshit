import axios from "axios";
import React, { useContext, useEffect, useReducer, useState } from "react";
import { Outlet } from "react-router";
import { useLocation } from "react-router-dom";
import { LocalStorage } from "../services/LocalStorage";
import QuestionViewFixedCtx, {
  QuestionViewFixedProvider,
} from "../context/questionViewFixed";
import QuestionViewFixedEasy from "../components/QuestionViewFixedEasy";
import QuestionViewFixedMedium from "../components/QuestionViewFixedMedium";
import QuestionsViewFixedHard from "../components/QuestionsViewFixedHard";
import QuestionViewCtx, { QuestionViewProvider } from "../context/questionView";
import AsssessmentQuestionBoxHandler from "../components/questionView/AsssessmentQuestionBoxHandler";
import TechnologyService from "../services/technologyService";

function reducer(state, action) {
  switch (action.type) {
    case "easy":
      /* console.log("reducer", { ...state, easy: state.easy + 1 }); */
      return { ...state, easy: state.easy + 1 };
    case "medium":
      /* console.log("reducer", { ...state, easy: state.medium + 1 }); */
      return { ...state, medium: state.medium + 1 };
    case "hard":
      /* console.log("reducer", { ...state, hard: state.hard + 1 }); */
      return { ...state, hard: state.hard + 1 };
    default:
      /* console.log("reducer", state); */
      return state;
  }
}

// subTopicID for Questions 173
function QuestionViewFixed() {
  /*  console.log("rerender"); */

  const [state, dispatcher] = useReducer(reducer, {
    easy: 0,
    medium: 0,
    hard: 0,
  });

  /* console.log("state", state); */
  useEffect(() => {
    /* console.log("di"); */
  }, [state]);

  //
  const { data, setData } = useContext(QuestionViewCtx);

  // Get Query Params.
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const totalEasy = queryParams.get("easy");
  const totalMedium = queryParams.get("medium");
  const totalHard = queryParams.get("hard");
  const subTopicId = queryParams.get("subTopicID");

  // Questions Related Variables.
  const [questions, setQuestions] = useState([]);
  const [easyQuestions, setEasyQuestions] = useState([]);
  const [mediumQuestions, setMediumQuestions] = useState([]);
  const [hardQuestions, setHardQuestions] = useState([]);

  // Stores String EASY | MEDIUM | HARD.
  const [currentPage, setCurrentPage] = useState("easy");

  useEffect(() => {
    async function fetch() {
      // subtopicid is stored in localstorage

      const res = await axios.get(
        `https://www.nareshit.net/fetchDynamicQuestions?Hardcount=${totalHard}&MediumCount=${totalMedium}&EasyCount=${totalEasy}&SubTopicID=${173}`
      );
      setQuestions(res.data);
      /* console.log(res.data); */
    }
    fetch();
  }, []);

  // Assign required values into variables responnsibe for rendering that page
  useEffect(() => {
    // questions variable stores all the questions fetched by the loader.
    let easy = questions.filter((ele) => ele.DifficultyLevelID === 1);
    let medium = questions.filter((ele) => ele.DifficultyLevelID === 2);
    let hard = questions.filter((ele) => ele.DifficultyLevelID === 3);

    setEasyQuestions(easy);
    setMediumQuestions(medium);
    setHardQuestions(hard);
  }, [questions]);

  // when pagination changes on any page
  function onPaginationChange(difficultyLevel, currentPagination) {
    dispatcher({ type: difficultyLevel });
    /* console.log(difficultyLevel, currentPagination); */
  }

  // responsible for storing the component return question data jsx
  let content = (
    <QuestionViewFixedEasy
      questions={easyQuestions}
      setCurrentPage={setCurrentPage}
      onPaginationChange={onPaginationChange}
    />
  );
  if (currentPage === "medium")
    content = (
      <QuestionViewFixedMedium
        questions={mediumQuestions}
        setCurrentPage={setCurrentPage}
        onPaginationChange={onPaginationChange}
      />
    );
  if (currentPage === "hard")
    content = (
      <QuestionsViewFixedHard
        questions={hardQuestions}
        setCurrentPage={setCurrentPage}
        onPaginationChange={onPaginationChange}
      />
    );

  // technology selected in Technology page.
  const selectTechnology = TechnologyService.technology?.programmingLanguage;

  const [stale, setStale] = useState(false);

  const [questionView, setQuestionView] = useState([]);

  return (
    <main>
      <section className="flex justify-center my-10">
        <QuestionViewProvider>
          <AsssessmentQuestionBoxHandler
            setStale={() => []}
            data={questions}
            setData={setData}
            selectTechnology={selectTechnology}
            stale={stale}
            questionView={questionView}
            setQuestionView={setQuestionView}
          />
        </QuestionViewProvider>
      </section>
      <section className="border-t-4 border-gray-200">{content}</section>
    </main>
  );
}

export default QuestionViewFixed;
