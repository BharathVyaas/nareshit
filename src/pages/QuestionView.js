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
  console.log(LocalStorage.questionView);
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
              <AsssessmentQuestionBoxHandler
                setStale={setStale}
                selectTechnology={selectTechnology}
                stale={stale}
                questionView={questionView}
                setQuestionView={setQuestionView}
              />
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
          console.log(res);
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

  return (
    <>
      {modalData && (
        <QuestionModelHandler
          question={modalData}
          setModalData={setModalData}
        />
      )}
      <section
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
          onClick={() => {
            setModalData(question);
          }}
        >
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
