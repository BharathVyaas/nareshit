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

export function Questions({
  questions,
  modalHandler,
  type,
  currentValue,
  setCurrentValue,
  currentCombination,
}) {
  const includeHandler = (flag, question, e) => {
    let includes = [];
    if (currentCombination.includes && currentCombination.includes[type]) {
      includes = currentCombination.includes[type].includes || [];
    }

    if (flag) {
      if (Number(currentValue) >= includes.length) {
        window.alert(`Questions should not exeed ${currentValue}`);
      }
      e.target.checked = false;
    }

    // user want to add
    if (flag) {
      // if item doesn't exists
      if (!includes.includes(question.QuestionID)) {
        includes.push(question.QuestionID);
      } else {
        return;
      }
    }
    // user want to remove
    if (!flag) {
      if (includes.includes(question.QuestionID)) {
        const index = includes.indexOf(question.QuestionID);
        includes.splice(index, 1); // Remove the element at the found index
      } else {
        return;
      }
    }
  };

  return (
    <>
      {questions &&
        questions.map((question) => (
          <Question
            question={question}
            includeArr={
              (currentCombination.includes &&
                currentCombination.includes[type]?.includes) ||
              []
            }
            handler={modalHandler}
            includeHandler={includeHandler}
          />
        ))}
    </>
  );
}

function Question({ question, handler, includeHandler, includeArr }) {
  const [modalData, setModalData] = useState(false);
  let isIncluded = false;

  if (includeArr) {
    isIncluded = includeArr.includes(question.QuestionID);
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
          defaultChecked={isIncluded}
          onChange={(e) => {
            includeHandler(e.target.checked, question, e);
            handler(e.target.checked, question);
          }}
          className="max-w-[5%] min-w-[5%]"
        />
        <div
          className="flex ms-2 container items-center"
          onClick={() => {
            setModalData(question);
          }}
        >
          <article className="max-w-[95%] min-w-[95%] overflow-hidden ">
            <h3>{question.Question}</h3>
          </article>
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
  // {id: {element}}
  const [combination, setCombination] = useState({});
  //  (element: {selectedModule, selectedSubTopic,selectedTopic,easy, medium, hard, ModuleID, TopicID, SubTopicID} && combination) || (DataObj {...element} && combination)
  const [popup, setPopup] = useState(false);

  const [editModal, setEditModal] = useState(false);
  const [viewModal, setViewModal] = useState(false);

  const setEditModalHandler = (ModuleID, TopicID, SubTopicID, DataObj) => {
    setEditModal({
      ModuleID,
      TopicID,
      SubTopicID,
      DataObj,
      easy: 0,
      medium: 0,
      hard: 0,
      combination,
      popupType: "edit",
    });
  };

  // type if we include new question type refers to the modal difficulty type
  const handler = (resultObj, type) => {
    console.log("combination", combination);
    console.log("resultObj", resultObj);
    console.log("type", type);

    if (resultObj.id) {
      const key = resultObj.id;
      // if user want to added combination

      setCombination((prev) => {
        const obj = { ...prev };
        // if object doesn't exists
        if (!combination[key]) {
          obj[key] = resultObj;
        }

        if (!obj[key]?.includes) {
          obj[key].includes = {};
        }

        if (type === "edit") {
          obj[key].easy = Number(resultObj.easy) || 0;
          obj[key].medium = Number(resultObj.medium) || 0;
          obj[key].hard = Number(resultObj.hard) || 0;
        }
        console.log("obj", obj);

        return obj;
      });
    } else {
      const key = Object.keys(resultObj)[0];
      const obj = { ...combination };
      if (combination[key]) {
        const data = {
          includes: resultObj[key][type],
          count: resultObj[key][type].length,
        };

        obj[key].includes[type] = data;
      }
      setCombination(obj);
    }
  };

  return (
    <div className="bg-gray-50 min-h-[70vh]">
      {/** Modal to conform combination */}
      {viewModal && (
        <QuestionViewHandler
          modalData={viewModal}
          setPopup={setViewModal}
          handler={handler}
        />
      )}

      {/**  Edit Modal */}
      {editModal && (
        <QuestionViewHandler
          modalData={editModal}
          setPopup={setEditModal}
          handler={handler}
        />
      )}

      {/**  Topics */}
      <Topics setDataHandler={setEditModalHandler} />

      {/**  Combination Table */}
      <CombinationRenderer
        setViewModal={setViewModal}
        setEditModal={setEditModal}
        combination={combination}
        setCombination={setCombination}
      />
    </div>
  );
}
