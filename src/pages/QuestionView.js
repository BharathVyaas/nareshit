<<<<<<< HEAD
import React, { useCallback, useEffect, useState } from "react";

import { AnimatePresence, motion } from "framer-motion";
import { useLocation } from "react-router";
import axios from "axios";
import QuestionModelHandler from "../ui/QuestionModelHandler";
import QuestionViewHandler from "../ui/QuestionViewHandler";
import Topics from "../components/questionViews/Topics";
import CombinationRenderer from "../components/questionViews/CombinationRenderer";
import QuestionViewNext from "../components/questionViews/QuestionViewNext";
import _debounce from "lodash/debounce";
import Includes from "../components/questionViews/Includes";

export function Questions({
  questions,
  modalHandler,
  currentIncludes,
  type,
  currentValue,
  currentCombination,
}) {
  const includeHandler = (flag, question, e) => {
    let includes = [];
    if (currentCombination.includes && currentCombination.includes[type]) {
      includes = currentCombination.includes[type].includes || [];
    }

    if (flag) {
      if (Number(currentIncludes) >= currentValue) {
        window.alert(`Questions should not exceed ${currentValue}`);
        e.target.checked = false;
      }
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
=======
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
import IncludesContext, {
  IncludesContextProvider,
} from "../context/includesContext";
import UpdateQuestions from "../context/updateQuestions";
import { useLoaderData } from "react-router";
import { DifficultySubescribeService } from "../services/difficultySubescribe";
import axios from "axios";
import Modal from "../ui/Modal";
import QuestionModelHandler from "../ui/QuestionModelHandler";
import ExcelImport from "../components/ExcelImport";
import TechnologyService from "../services/technologyService";
import AsssessmentQuestionBoxHandler from "../components/questionView/AsssessmentQuestionBoxHandler";
import { QuestionViewProvider } from "../context/questionView";

const Titles = ["MCQ"];

function QuestionView() {
  const questions = useLoaderData();

  const [questionView, setQuestionView] = useState([]);

  // Make Sure to destroy previous subescriptions.
  DifficultySubescribeService.source();

  const [fetchQuestionType, setFetchQuestionType] = useState(["", ""]);

  const [selectedModule, setSelectedModule] = useState({});
  const [selectedTopic, setSelectedTopic] = useState({});
  const [selectedSubTopic, setSelectedSubTopic] = useState({});

  const [stale, setStale] = useState(false);

  const searchRef = useRef();

  LocalStorage.data = BuilderService.getData();

  const MCQDifficulty = BuilderService.getDifficultyByTitle(Titles[0]);

  const selectTechnology = TechnologyService.technology?.programmingLanguage;
  /* console.log(LocalStorage.questionView); */
  return (
    <AnimatePresence>
      <IncludesContextProvider>
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
          <h1 className="ms-[20px] pt-5 text-lg font-semibold">
            Selected Technology: {selectTechnology}
          </h1>
          <div>
            <section className="flex m-[20px]">
              <QusetionViewTechnlogy
                questionView={questionView}
                setQuestionView={setQuestionView}
                selectedModule={selectedModule}
                setSelectedModule={setSelectedModule}
                selectedTopic={selectedTopic}
                setSelectedTopic={setSelectedTopic}
                selectedSubTopic={selectedSubTopic}
                setSelectedSubTopic={setSelectedSubTopic}
              />
            </section>
            <section className="flex justify-center p-5">
              {/* <h2 className="max-w-[20%]">
                <span>{selectTechnology}</span>
              </h2> */}
              <QuestionViewProvider>
                <AsssessmentQuestionBoxHandler
                  setStale={setStale}
                  selectTechnology={selectTechnology}
                  stale={stale}
                  questionView={questionView}
                  setQuestionView={setQuestionView}
                />
              </QuestionViewProvider>
            </section>
          </div>
          <section className="flex my-4 justify-between items-center">
            <FetchData setStale={setStale} />
          </section>
          {/** grid grid-cols-2 */}
          <section className="">
            <Questions questions={questions} />
          </section>
          <Button link="/categories/scheduletime" />
        </motion.main>
      </IncludesContextProvider>
    </AnimatePresence>
  );
}

export default QuestionView;

function Questions({ questions }) {
  const [questionArr, setQuestionArr] = useState(questions);

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
          const res = await getQuestions();
          /* console.log(res); */
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

          const res = await axios.get(
            `https://www.nareshit.net/fetchDynamicQuestions/?McqAll=${
              easy + hard + medium
            }&Hardcount=${hard}&MediumCount=${medium}&EasyCount=${easy}`
          );
          LocalStorage.exclude = [];

          setQuestionArr([...includedQuestions, ...res.data]);
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
            questionId={question.QuestionID}
            question={question}
            includes={includes}
            setIncludes={setIncludes}
>>>>>>> origin/main
          />
        ))}
    </>
  );
}

<<<<<<< HEAD
function Question({ question, handler, includeHandler, includeArr }) {
  const [modalData, setModalData] = useState(false);
  let isIncluded = false;

  if (includeArr) {
    isIncluded = includeArr.includes(question.QuestionID);
  }

=======
function Question({
  question,
  questions,
  includes,
  setIncludes,
  questionId,
  difficultyId,
}) {
  const [modalData, setModalData] = useState(false);

  function removeElement(arr, value) {
    return arr.filter((item) => item !== value);
  }

  const { setIncludes: setIncludesCtxFn } = useContext(IncludesContext);

  useEffect(() => {
    if (questions) {
      setIncludes(questions.map((question) => question.QuestionID));

      setIncludesCtxFn((prev) => {
        return { ...prev, includes: questions.length };
      });
    }
  }, [questions, setIncludesCtxFn]);

  useEffect(() => {
    setIncludesCtxFn(() => {
      return {
        includes:
          Number(BuilderService.getTotal()) - LocalStorage.exclude?.length || 0,
        excludes: LocalStorage.exclude?.length || 0,
      };
    });
    setIncludes((prev) =>
      prev.filter((element) => !LocalStorage.exclude?.includes(element))
    );
  }, []);

  function handler(flag) {
    if (flag) {
      LocalStorage.pullExclude(questionId);
      if (includes && !includes.includes(questionId))
        setIncludes((prev) => {
          const arr = [...prev];
          arr.push(questionId);
          return arr;
        });
      setIncludesCtxFn((prev) => {
        const includes = prev.includes + 1;
        const excludes = prev.excludes - 1;

        return { includes, excludes };
      });
    } else {
      LocalStorage.pushExclude(questionId);
      if (includes && includes.includes(questionId))
        setIncludes((prev) => removeElement([...prev], questionId));
      setIncludesCtxFn((prev) => {
        const includes = prev.includes - 1;
        const excludes = prev.excludes + 1;

        return { includes, excludes };
      });
    }
  }

  let bgColor;

  if (difficultyId == 2) bgColor = "rose";
  else if (difficultyId == 3) bgColor = "red";
  else bgColor = "green";

>>>>>>> origin/main
  return (
    <>
      {modalData && (
        <QuestionModelHandler
          question={modalData}
          setModalData={setModalData}
        />
      )}
      <section
<<<<<<< HEAD
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
=======
        className={` ${bgColor} scroll min-h-[6rem] flex items-center border-2 border-white overflow-auto justify-between`}
      >
        <input
          type="checkbox"
          checked={includes.includes(questionId)}
          onChange={(e) => handler(e.target.checked)}
          className="max-w-[5%] min-w-[5%]"
        />

        {/**<article
          className="ps-4 overflow-hidden h-full w-[90%] flex items-center cursor-pointer"
>>>>>>> origin/main
          onClick={() => {
            setModalData(question);
          }}
        >
<<<<<<< HEAD
          <article className="max-w-[95%] min-w-[95%] overflow-hidden ">
            <h3>{question.Question}</h3>
          </article>
=======
          <h3>{question.Question}</h3>
        </article>
         */}
        <div
          className="flex container items-center"
          onClick={() => {
            setModalData(question);
          }}
        >
          <article className="max-w-[35%] min-w-[35%] overflow-hidden ">
            <h3>{question.Question}</h3>
          </article>
          <Option option="Option1" question={question} questionKey="OptionA" />
          <Option option="Option2" question={question} questionKey="OptionB" />
          <Option option="Option3" question={question} questionKey="OptionC" />
          <Option option="Option4" question={question} questionKey="OptionD" />
          <aside className="max-w-[30%] min-w-[30%] overflow-hidden ">
            <h3>{question.CorrectAnswer}</h3>
          </aside>
>>>>>>> origin/main
        </div>
      </section>
    </>
  );
}

<<<<<<< HEAD
export async function loader() {
  return 1;
}

export function QuestionViewV2() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const TestID = queryParams.get("TestID");
  const TestDetailsID = queryParams.get("TestDetailsID");

  // for validation for dynamic and fixed
  const [natureID, setNatureID] = useState(0);

  // {id: {element}}
  const [combination, setCombination] = useState({});

  //  (element: {selectedModule, selectedSubTopic,selectedTopic,easy, medium, hard, ModuleID, TopicID, SubTopicID} && combination) || (DataObj {...element} && combination)
  const [editModal, setEditModal] = useState(false);
  const [viewModal, setViewModal] = useState(false);

  const isFormValid = true;
  const errMsg = false;

  /* const [isFormValid, setFormIsValid] = useState(true);
  const [errMsg, setErrMsg] = useState(false); */

  const queryEasy = queryParams.get("easy") || 0;
  const queryMedium = queryParams.get("medium") || 0;
  const queryHard = queryParams.get("hard") || 0;

  /*   useEffect(() => {
    const postCombinations = _debounce(async () => {
      await axios.post(
        "https://www.nareshit.net/Insert_Update_QuestionCombination",
        {
          TestId: TestID,
          TestDetailsId: TestDetailsID,
          Combinations: JSON.stringify(combination),
        }
      );
    }, 100);

    if (Object.keys(combination).length > 0) postCombinations();
  }, [combination, TestID, TestDetailsID]); */

  const fetchNatureID = useCallback(
    async (getCombinations) => {
      let res = await axios.post("https://www.nareshit.net/getBasicTestInfo", {
        data: { TestID: TestID },
      });
      setNatureID(res.data?.data[0].NatureID || 0);
      getCombinations(res.data?.data[0].NatureID || 0);
    },
    [TestID]
  );

  useEffect(() => {
    // for optimize
    const getCombinations = _debounce(async (natureID) => {
      const res = await axios.post(
        "https://www.nareshit.net/SelectQuestionCombination",
        {
          TestId: TestID,
          TestDetailsId: TestDetailsID,
        }
      );

      const fetchedCombinations = JSON.parse(
        res?.data?.dbresult?.[0]?.combinations || "{}"
      );

      if (natureID === 1) {
        // Iterate over the properties of fetchedCombinations
        for (const prop in fetchedCombinations) {
          if (Object.hasOwnProperty.call(fetchedCombinations, prop)) {
            const value = fetchedCombinations[prop];
            // Check if the value is an object and has an 'includes' property
            if (typeof value === "object" && value.hasOwnProperty("includes")) {
              // Set the 'includes' property to an empty object
              value.includes = {};
            }
          }
        }
      }

      setCombination(fetchedCombinations);

      // Return the updated fetchedCombinations
      return fetchedCombinations;
    }, 100);

    fetchNatureID(getCombinations);
  }, [fetchNatureID, TestID, TestDetailsID]);

  const setEditModalHandler = (ModuleID, TopicID, SubTopicID, DataObj) => {

    let easy = 0;
    let medium = 0;
    let hard = 0;
    let flag = false;
    let id = '';

      for(let key in combination){
        if(combination[key].ModuleID === ModuleID &&  combination[key].TopicID === TopicID && combination[key].SubTopicID === SubTopicID){
          easy = combination[key].easy;
          medium = combination[key].medium;
          hard = combination[key].hard;
          flag = true;
          id= combination[key].id
        }
      }

    setEditModal({
      ModuleID,
      TopicID,
      SubTopicID,
      DataObj,
      easy,
      medium,
      hard,
      combination,
      popupType: "edit",
      flag,
      id
    });
  };

  // type if we include new question type refers to the modal difficulty type
  const handler = (resultObj, type, id, setDataFlag) => {
    console.log("combination", combination);
    console.log("resultObj", resultObj);
    console.log("type", type);

    // user have selected same combination in create tamplate
    if(setDataFlag){
      setCombination((prev) => {
        const obj = {...combination}

        obj[id].easy = Number(resultObj.easy) === NaN ? 0 : Number(resultObj.easy)
        obj[id].medium = Number(resultObj.medium) === NaN ? 0 : Number(resultObj.medium) 
        obj[id].hard = Number(resultObj.hard) === NaN ?  0 : Number(resultObj.hard)

        return obj
      })
    }else{

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

        if(obj[key]){
          if(!obj[key].includes){
            obj[key].includes[type] = {}
          }
        obj[key].includes[type] = data;
        }else{
          console.warn('uncought')
        }

        
      }
      setCombination(obj);
    }}
  };

  const [tableTotal, setTableTotal] = useState({ easy: 0, medium: 0, hard: 0 });

  useEffect(() => {
    if (combination) {
      Object.values(combination).forEach((ele) => {
        // if Nature is not dynamic
        if (natureID === 2 || natureID === "2") {
          for (let key in ele.includes) {
            const value = ele.includes[key];

            if (key === "easy") {
              setTableTotal((prev) => {
                if (!prev) return prev;
                const obj = { ...prev };
                obj.easy += value?.count || 0;
                return obj;
              });
            }
            if (key === "medium") {
              setTableTotal((prev) => {
                if (!prev) return prev;
                const obj = { ...prev };
                obj.medium += value?.count || 0;
                return obj;
              });
            }
            if (key === "hard") {
              setTableTotal((prev) => {
                if (!prev) return prev;
                const obj = { ...prev };
                obj.hard += value?.count || 0;
                return obj;
              });
            }
          }
        }
        if (natureID === 1 || natureID === "1") {
          let totalTableEasy = 0;
          let totalTableMedium = 0;
          let totalTableHard = 0;
          Object.values(combination).forEach((ele) => {
            totalTableEasy += ele?.easy || 0;
            totalTableMedium += ele?.medium || 0;
            totalTableHard += ele?.hard || 0;
          });

          setTableTotal((prev) => {
            if (!prev) return prev;
            let obj = { ...prev };

            obj.easy = totalTableEasy;
            obj.medium = totalTableMedium;
            obj.hard = totalTableHard;

            return obj;
          });
        }
      });
    }
  }, [combination, natureID]);

  return (
    <AnimatePresence>
      <motion.main
        initial={{ x: "100%" }}
        animate={{ x: 0, transition: { duration: 0.3 } }}
        exit={{ x: "-100%", transition: { duration: 0.3 } }}
      >
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
              styles={"w-[640px]"}
            />
          )}

          {/**  Topics */}
          <Topics
            combination={combination}
            setDataHandler={setEditModalHandler}
          />

          {/**  Combination Table */}
          <CombinationRenderer
            natureID={natureID}
            setViewModal={setViewModal}
            setEditModal={setEditModal}
            combination={combination}
            setCombination={setCombination}
          />

          {/**  Question View Next */}
          <QuestionViewNext
            isFormValid={isFormValid}
            errMsg={errMsg}
            TestID={TestID}
            combination={combination}
            natureID={natureID}
            isTableTotalValid={
              tableTotal.easy >= queryEasy &&
              tableTotal.medium >= queryMedium &&
              tableTotal.hard >= queryHard
            }
          />
        </div>
      </motion.main>
    </AnimatePresence>
  );
}
=======
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

  const [fetchCount, setFetchCount] = useState(0);
  const { includes } = useContext(IncludesContext);

  return (
    <>
      <div className="flex">
        <aside className="mx-4">
          <h2>
            Easy Count:<span>{easy}</span>
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
            Medium Count:<span>{medium}</span>
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
            Hard Count: <span>{hard}</span>
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
            Fetched Questions:<span>{fetchCount}</span>
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
            Include:
            <input
              className="w-7 ms-2 rounded text-black bg-white"
              type="number"
              value={includes.includes}
              onChange={() => {}}
              disabled
            />
          </button>
          <button
            className="bg-sky-400 mx-4 px-12 font-medium py-[7px] rounded"
            onClick={() => DifficultySubescribeService.notify("exclude")}
          >
            Exclude:
            <input
              className="w-7 ms-2 rounded text-black bg-white"
              value={includes.excludes}
              type="number"
              onChange={() => {}}
              disabled
            />
          </button>
        </aside>
      </div>
    </>
  );
}

export async function loader() {
  const result = await getQuestions(
    BuilderService.getDifficulty()[0].easy,
    BuilderService.getDifficulty()[0].medium,
    BuilderService.getDifficulty()[0].hard
  );

  return result;
}
>>>>>>> origin/main
