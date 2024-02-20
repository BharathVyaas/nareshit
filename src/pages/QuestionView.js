import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import QusetionViewTechnlogy from "../components/questionView/QuestionView";
import { getModuleNames, getQuestions, queryClient } from "../util/http";
import BuilderService from "../services/builder";
import Button from "../ui/Button";
import AssessmentQuestionBox from "../components/AssessmentQuestionbox";

import { AnimatePresence, motion } from "framer-motion";
import { LocalStorage } from "../services/LocalStorage";
import UpdateQuestions from "../context/updateQuestions";
import { useLoaderData, useLocation, useNavigate } from "react-router";
import { DifficultySubescribeService } from "../services/difficultySubescribe";
import axios from "axios";
import Modal from "../ui/Modal";
import QuestionModelHandler from "../ui/QuestionModelHandler";
import ExcelImport from "../components/ExcelImport";
import TechnologyService from "../services/technologyService";
import AsssessmentQuestionBoxHandler from "../components/questionView/AsssessmentQuestionBoxHandler";
import { QuestionViewProvider } from "../context/questionView";
import QuestionViewCtx from "../context/questionView";
import QuestionViewHandler from "../ui/QuestionViewHandler";
import AuthCtx from "../context/auth.context";
import SubTopicNameRenderer from "../components/questionViews/SubTopicNameRenderer";
import TopicNameRenderer from "../components/questionViews/TopicNameRenderer";
import ModuleNameRenderer from "../components/questionViews/ModuleNameRenderer";
import Topics from "../components/questionViews/Topics";
import CombinationRenderer from "../components/questionViews/CombinationRenderer";

const Titles = ["MCQ"];

function QuestionView() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const TechnologyID = queryParams.get("TechnologyID");
  const [technology, setTechnology] = useState();

  useEffect(() => {
    async function techHandler() {
      const res = await axios.get("https://www.nareshit.net/FetchTechnologies");

      if (TechnologyID) {
        setTechnology(
          res?.data?.find((ele) => ele.TechnologyID === Number(TechnologyID))
        );
      }
    }
    techHandler();
  }, []);

  const navigate = useNavigate();
  const { isLoggedIn } = useContext(AuthCtx);

  useEffect(() => {
    if (!isLoggedIn) navigate("/login?page=/categories/questionview");
  }, []);

  const linkToNext =
    BuilderService.technologyService._technology.natureOfAssessment === "fixed";

  const { data, setData } = useContext(QuestionViewCtx);
  const [stale, setStale] = useState(false);
  const [questions, setQuestions] = useState();
  const [showPopupWarn, setShowPopupWarn] = useState(false);
  useEffect(() => {
    setQuestions(data);
    let easy = 0;
    let medium = 0;
    let hard = 0;

    if (data)
      data.forEach((element) => {
        if (element.DifficultyLevelID === 1) {
          easy = easy + 1;
        } else if (element.DifficultyLevelID === 2) {
          medium += 1;
        } else if (element.DifficultyLevelID === 3) {
          hard += 1;
        }
      });

    BuilderService.questionCount.easy = easy;
    BuilderService.questionCount.medium = medium;
    BuilderService.questionCount.hard = hard;

    BuilderService.questionCount.total = easy + medium + hard;
  }, [data]);

  function handler(data) {
    const prevs = [];

    setQuestionView((prev) => {
      if (!prev || prev.length === 0) return [data];
      return [...prev, data];
    });
  }

  let topicData = {
    selectedSubTopic: LocalStorage?.subTopicData,
    selectedTopic: LocalStorage?.topicData,
    selectedModule: LocalStorage?.moduleData,
  };

  const [questionView, setQuestionView] = useState([]);

  // Make Sure to destroy previous subescriptions.
  DifficultySubescribeService.source();

  const [selectedModule, setSelectedModule] = useState({});
  const [selectedTopic, setSelectedTopic] = useState({});
  const [selectedSubTopic, setSelectedSubTopic] = useState({});

  const searchRef = useRef();

  LocalStorage.data = BuilderService.getData();

  const [popup, setPopup] = useState(false);

  const MCQDifficulty = BuilderService.getDifficultyByTitle(Titles[0]);

  let totalEasy = 0;
  let totalMedium = 0;
  let totalHard = 0;

  LocalStorage.questionView.forEach((element) => (totalEasy += element.easy));
  LocalStorage.questionView.forEach(
    (element) => (totalMedium += element.medium)
  );
  LocalStorage.questionView.forEach((element) => (totalHard += element.hard));
  let subTopicId = LocalStorage.subTopicData?.subTopicId;

  const selectTechnology = TechnologyService.technology?.programmingLanguage;
  /* console.log(LocalStorage.questionView); */

  /*useEffect(() => {
    console.log("i");
    setTotal(totalEasy + totalMedium + totalHard);
  }, [totalEasy, totalMedium, totalHard]); */

  function nextButtonHandler(type, data) {
    /* setTotal((prev) => {
      return { ...prev, [type]: data };
    }); */
  }

  const [isValid, setIsValid] = useState(false);

  return (
    <AnimatePresence>
      <motion.main
        initial={{ x: "100%", transition: { duration: 0.3 } }}
        animate={{ x: 0, transition: { duration: 0.3 } }}
        exit={{ x: "100%", transition: { duration: 0.3 } }}
        className="bg-gray-50 min-h-[70vh]"
      >
        {/* <section className=" pt-3">
            <div className="ms-[58%] flex">
              <div>
                <input
                  name="search"
                  className="ps-2 text-start border-2 border-[gray] rounded-s"
                  placeholder="Enter Search Term"
                  type="text"
                  ref={searchRef}
                />
                <button className="bg-[gray] px-3 text-white border-2 border-[gray] font-medium">
                  Search
                </button>
              </div>
              <div className="ms-[1px] bg-[gray] px-3 text-white border-2 border-[gray] rounded-e font-medium">
                <ExcelImport />
              </div>
            </div>
          </section> */}
        <div className="flex justify-between">
          <h1 className="ms-[20px] pt-5 text-lg font-semibold">
            Selected Technology: {technology?.TechnologyName}
          </h1>
          <div>
            {showPopupWarn && (
              <span className="mt-5 px-6 bg-transparent  text-red-400 font-semibold">
                Must select a module
              </span>
            )}
            <button
              className="mr-[20px] mt-5 px-6 max-h-8 min-h-8 bg-[gray] text-white font-semibold rounded-md shadow-md hover:bg-gray-500 focus:outline-none focus:ring-2 focus:bg-gray-500 focus:ring-opacity-50"
              onClick={() => {
                if (selectedModule.module) {
                  setShowPopupWarn(false);
                  setPopup(true);
                } else {
                  setShowPopupWarn(true);
                }
              }}
            >
              Set Data
            </button>
          </div>

          {popup && (
            <QuestionViewHandler
              technology={technology}
              topicData={topicData}
              setPopup={setPopup}
              handler={handler}
            />
          )}
        </div>
        <div>
          <section className="flex m-[20px]">
            <QusetionViewTechnlogy
              technology={technology}
              questionView={questionView}
              setQuestionView={setQuestionView}
              selectedModule={selectedModule}
              setSelectedModule={setSelectedModule}
              selectedTopic={selectedTopic}
              data={data}
              setData={setData}
              setSelectedTopic={setSelectedTopic}
              selectedSubTopic={selectedSubTopic}
              setSelectedSubTopic={setSelectedSubTopic}
            />
          </section>
          <div className="p-5">
            {BuilderService.technologyService._technology.natureOfAssessment ===
              "fixed" && (
              <div className="text-lg font-semibold mb-4">
                <h2 className="">
                  Please select an{" "}
                  <span className="bg-red-100 rounded">underlined value</span>{" "}
                  to fetch questions:
                </h2>
              </div>
            )}
            <section className="flex justify-center">
              {/* <h2 className="max-w-[20%]">
                <span>{selectTechnology}</span>
              </h2> */}
              <QuestionViewProvider>
                <AsssessmentQuestionBoxHandler
                  nextButtonHandler={nextButtonHandler}
                  setStale={setStale}
                  setIsValid={setIsValid}
                  isValid={isValid}
                  data={data}
                  setData={setData}
                  selectTechnology={selectTechnology}
                  stale={stale}
                  questionView={questionView}
                  setQuestionView={setQuestionView}
                />
              </QuestionViewProvider>
            </section>
          </div>
        </div>
        {/* <section className="flex my-4 justify-between items-center">
          <FetchData setStale={setStale} />
        </section> */}
        {/** grid grid-cols-2 */}

        <Button disabled={!isValid} link={"/categories/scheduletime"} />
      </motion.main>
    </AnimatePresence>
  );
}

export default QuestionView;

export function Questions({ questions, modalHandler }) {
  const [questionArr, setQuestionArr] = useState(questions);

  useEffect(() => {
    setQuestionArr(questions);
  }, [questions]);

  const questionHandler = useCallback(async (difficultyId, count) => {
    try {
      switch (difficultyId) {
        case "1": {
          setQuestionArr(
            questions.filter((question) => {
              return question.DifficultyLevelID === 1;
            })
          );
          break;
        }
        case "2": {
          setQuestionArr(
            questions.filter((question) => {
              return question.DifficultyLevelID === 2;
            })
          );

          break;
        }
        case "3": {
          setQuestionArr(
            questions.filter((question) => {
              return question.DifficultyLevelID === 3;
            })
          );
          break;
        }
        case "all": {
          /* setQuestionArr(questions); */
          setQuestionArr(questions);
          break;
        }
        default: {
          const excludedArr = LocalStorage.exclude;

          if (excludedArr.length === 0) break;

          const excludedQuestions = excludedArr.map((id) => {
            let postFilter = questions.filter(
              (question) => question.QuestionID === id
            );
            postFilter = postFilter && postFilter[0];
            return postFilter;
          });

          let excludedMap = {};
          excludedQuestions?.forEach((element) => {
            if (!excludedMap[String(element?.DifficultyLevelID)])
              excludedMap[String(element?.DifficultyLevelID)] = [];
            excludedMap[String(element?.DifficultyLevelID)].push(
              element?.QuestionID
            );
          });

          const includedQuestions = questions.filter(
            (element) => !LocalStorage.exclude.includes(element.QuestionID)
          );

          let easy = excludedMap["1"]?.length;
          let medium = excludedMap["2"]?.length;
          let hard = excludedMap["3"]?.length;

          if (!easy) easy = 0;
          if (!medium) medium = 0;
          if (!hard) hard = 0;
          LocalStorage.exclude = [];

          break;
        }
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  DifficultySubescribeService.insert(questionHandler);

  const [includes, setIncludes] = useState([]);

  return (
    <>
      {questionArr &&
        questionArr.map((question, index) => (
          <Question
            key={question.QuestionID + index}
            difficultyId={question?.DifficultyLevelID}
            questions={questionArr}
            modalHandler={modalHandler}
            questionId={question.QuestionID}
            question={question}
            includes={includes}
            setIncludes={setIncludes}
          />
        ))}
    </>
  );
}

function Question({
  question,
  questions,
  includes,
  setIncludes,
  questionId,
  difficultyId,
  modalHandler,
}) {
  const [modalData, setModalData] = useState(false);

  function removeElement(arr, value) {
    return arr.filter((item) => item !== value);
  }

  /* useEffect(() => {
    if (questions) {
      setIncludes(questions.map((question) => question.QuestionID));
    }
  }, [questions]); */

  useEffect(() => {
    setIncludes(LocalStorage.includes);
  }, []);

  const [includeCount, setIncludeCount] = useState(0);

  function handler(flag) {
    // Check Length
    if (flag) {
      setIncludeCount(LocalStorage.includes.length);
    }

    // Includes
    if (flag) {
      if (!LocalStorage.includes.includes(questionId)) {
        LocalStorage.includes = [...LocalStorage.includes, questionId];
      }
    }
    if (!flag) {
      if (LocalStorage.includes.includes(questionId)) {
        LocalStorage.pullIncludes(questionId);
      }
    }
    // Exclude
    if (flag) {
      LocalStorage.pullExclude(questionId);
      if (includes && !includes.includes(questionId))
        setIncludes((prev) => {
          const arr = [...prev];
          arr.push(questionId);
          return arr;
        });
    } else {
      LocalStorage.pushExclude(questionId);
      if (includes && includes.includes(questionId))
        setIncludes(LocalStorage.includes);
    }

    if (modalHandler) modalHandler(flag, questionId);
  }

  return (
    <>
      {modalData && (
        <QuestionModelHandler
          question={modalData}
          setModalData={setModalData}
        />
      )}
      <section
        className={`scroll cursor-pointer min-h-[3rem] p-1 flex items-center border-y-[1px] overflow-auto justify-between`}
      >
        <input
          type="checkbox"
          checked={includes.includes(questionId)}
          onChange={(e) => {
            console.log("ds");
            handler(e.target.checked);
          }}
          className="max-w-[5%] min-w-[5%]"
        />

        {/**<article
          className="ps-4 overflow-hidden h-full w-[90%] flex items-center cursor-pointer"
          onClick={() => {
            setModalData(question);
          }}
        >
          <h3>{question.Question}</h3>
        </article>
         */}
        <div
          className="flex ms-2 container items-center"
          onClick={() => {
            setModalData(question);
          }}
        >
          <article className="max-w-[95%] min-w-[95%] overflow-hidden ">
            <h3>{question.Question}</h3>
          </article>
          {/* <article className="max-w-[35%] min-w-[35%] overflow-hidden ">
            <h3>{question.Question}</h3>
          </article>
          <Option option="Option1" question={question} questionKey="OptionA" />
          <Option option="Option2" question={question} questionKey="OptionB" />
          <Option option="Option3" question={question} questionKey="OptionC" />
          <Option option="Option4" question={question} questionKey="OptionD" />
          <aside className="max-w-[30%] min-w-[30%] overflow-hidden ">
            <h3>{question.CorrectAnswer}</h3>
          </aside> */}
        </div>
      </section>
    </>
  );
}

function Option({ option, question, questionKey }) {
  return (
    <article className="max-w-[20%] min-w-[20%] overflow-hidden">
      <h3>{option}</h3>
      <label htmlFor={question.QuestionID} className="overflow-clip ">
        <input
          id={question.QuestionID}
          type="radio"
          name={question.QuestionID}
        />
        {question[questionKey]}
      </label>
    </article>
  );
}

function FetchData({ setStale }) {
  const difficulty = BuilderService.getDifficulty();
  const easy = difficulty
    .map((element) => element.easy)
    .reduce((data, acc) => Number(data) + acc, 0);
  const medium = difficulty
    .map((element) => element.medium)
    .reduce((data, acc) => Number(data) + acc, 0);
  const hard = difficulty
    .map((element) => element.hard)
    .reduce((data, acc) => Number(data) + acc, 0);
  const total = easy + medium + hard;

  let updatedEasy = BuilderService.questionCount.easy;

  const [fetchCount, setFetchCount] = useState(0);

  return (
    <>
      <div className="flex">
        <aside className="mx-4">
          <h2>
            Easy Count:<span>{BuilderService.questionCount.easy}</span>
          </h2>

          <button
            onClick={() => {
              setFetchCount(easy);
              setStale(true);
              DifficultySubescribeService.notify("1", easy);
            }}
            className="bg-green-200 px-6 py-[.6px] rounded border-2 border-green-400"
          >
            Easy
          </button>
        </aside>

        <aside className="mx-4">
          <h2>
            Medium Count:<span>{BuilderService.questionCount.medium}</span>
          </h2>

          <button
            onClick={() => {
              setFetchCount(medium);
              setStale(true);
              DifficultySubescribeService.notify("2", medium);
            }}
            className="bg-rose-200 px-6 py-[.6px] rounded border-2 border-rose-400"
          >
            Medium
          </button>
        </aside>
        <aside className="mx-4">
          <h2>
            Hard Count: <span>{BuilderService.questionCount.hard}</span>
          </h2>

          <button
            onClick={() => {
              setFetchCount(hard);
              setStale(true);
              DifficultySubescribeService.notify("3", hard);
            }}
            className="bg-red-400 px-6 py-[.6px] rounded border-2 border-red-600"
          >
            Hard
          </button>
        </aside>
        <aside className="mx-4">
          <h2>
            Fetched Questions:<span>{BuilderService.questionCount.total}</span>
          </h2>
          <button
            className="bg-sky-400 border-2 border-sky-800 px-6 py-[.8px] rounded"
            onClick={() => {
              setFetchCount(total);
              DifficultySubescribeService.notify("all", total);
            }}
          >
            Show All
          </button>
        </aside>
      </div>
      <div>
        <aside className="flex me-10 text-white">
          <button className="bg-sky-400 mx-4 px-12 font-medium py-[7px] rounded">
            Include
          </button>
          <button
            className="bg-sky-400 mx-4 px-12 font-medium py-[7px] rounded"
            onClick={() => DifficultySubescribeService.notify("exclude")}
          >
            Exclude
          </button>
        </aside>
      </div>
    </>
  );
}

export async function loader() {
  return 1;
}

export function QuestionViewV2() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const queryEasy = queryParams.get("easy") || 0;
  const queryMedium = queryParams.get("medium") || 0;
  const queryHard = queryParams.get("hard") || 0;

  // ...
  const [combination, setCombination] = useState([]);
  const [popup, setPopup] = useState(false);

  const setDataHandler = (ModuleID, TopicID, SubTopicID, DataObj) => {
    setPopup({
      ModuleID,
      TopicID,
      SubTopicID,
      DataObj,
      easy: queryEasy,
      medium: queryMedium,
      hard: queryHard,
    });
  };

  const handler = (resultObj) => {
    setCombination((prev) => {
      const arr = [...prev];
      arr.push(resultObj);
      return arr;
    });
  };

  return (
    <div>
      {/** Modal to conform combination */}
      {popup && (
        <QuestionViewHandler
          modalData={popup}
          setPopup={setPopup}
          handler={handler}
        />
      )}

      {/**  Topics */}
      <Topics setDataHandler={setDataHandler} />

      {/**  Combination Table */}
      <CombinationRenderer combination={combination} />
    </div>
  );
}
