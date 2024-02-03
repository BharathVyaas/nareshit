import React, { useContext, useEffect, useState } from "react";
import QusetionViewTechnlogy from "../components/questionView/QuestionView";
import { getModuleNames, getQuestions, queryClient } from "../util/http";
import BuilderService from "../services/builder";
import Button from "../ui/Button";
import AssessmentQuestionBox from "../components/AssessmentQuestionbox";

import { AnimatePresence, motion } from "framer-motion";
import { LocalStorage } from "../services/LocalStorage";
import { useQuery } from "@tanstack/react-query";
import IncludesContext, {
  IncludesContextProvider,
} from "../context/includesContext";

const Titles = ["MCQ"];

function QuestionView() {
  const [fetchQuestionType, setFetchQuestionType] = useState(["", ""]);

  const [selectedModule, setSelectedModule] = useState({});
  const [selectedTopic, setSelectedTopic] = useState({});
  const [selectedSubTopic, setSelectedSubTopic] = useState({});

  const [stale, setStale] = useState(false);

  const fetchDataTypeHandler = (difficultyLvl, count) => {
    setFetchQuestionType([difficultyLvl, count]);
  };

  function excludeHandler() {}

  LocalStorage.data = BuilderService.getData();

  const MCQDifficulty = BuilderService.getDifficultyByTitle(Titles[0]);
  const selectTechnology =
    LocalStorage.data.technologyData._technology.programmingLanguage;

  return (
    <AnimatePresence>
      <IncludesContextProvider>
        <motion.main
          initial={{ x: "100%", transition: { duration: 0.3 } }}
          animate={{ x: 0, transition: { duration: 0.3 } }}
          exit={{ x: "100%", transition: { duration: 0.3 } }}
          className="bg-gray-50 min-h-[70vh]"
        >
          <section className="flex justify-between m-[40px]">
            <h2 className="max-w-[20%]">
              Select Technology Name:<span>{selectTechnology}</span>
            </h2>

            <QusetionViewTechnlogy
              selectedModule={selectedModule}
              setSelectedModule={setSelectedModule}
              selectedTopic={selectedTopic}
              setSelectedTopic={setSelectedTopic}
              selectedSubTopic={selectedSubTopic}
              setSelectedSubTopic={setSelectedSubTopic}
            />
          </section>
          <section className="flex p-5 bg-slate-200">
            <AssessmentQuestionBox
              title={Titles[0]}
              setStale={setStale}
              easy={MCQDifficulty.easy}
              medium={MCQDifficulty.medium}
              hard={MCQDifficulty.hard}
            />
          </section>
          <section className="flex my-4 justify-between items-center">
            <FetchData
              fetchDataTypeHandler={fetchDataTypeHandler}
              setStale={setStale}
              excludeHandler={excludeHandler}
            />
          </section>
          <section className="bg-rose-200">
            {fetchQuestionType[0] && fetchQuestionType[1] && (
              <Questions
                fetchQuestionType={fetchQuestionType}
                setStale={setStale}
                stale={stale}
              />
            )}
          </section>
          <Button link="/categories/scheduletime" />
        </motion.main>
      </IncludesContextProvider>
    </AnimatePresence>
  );
}

export default QuestionView;

function Questions({ fetchQuestionType, stale, setStale }) {
  const { data: questions, refetch } = useQuery({
    queryKey: ["questionview", "questions"],
    queryFn: () => getQuestions(fetchQuestionType[0], fetchQuestionType[1]),
    enabled: stale,
  });

  let updatedQuestions;
  if (questions) updatedQuestions = [...questions.moduleNames];

  useEffect(() => {
    if (stale) {
      refetch();
      setStale(false);
    }
  }, [stale, refetch]);

  const [includes, setIncludes] = useState([]);

  return (
    <>
      {updatedQuestions &&
        updatedQuestions.map((question) => (
          <Question
            key={question.QuestionID}
            difficultyId={question.DifficultyLevelID}
            questions={questions.moduleNames}
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
    <section
      className={` ${bgColor} scroll min-h-[6rem] flex items-center border-2 border-white overflow-auto justify-between`}
    >
      <input
        type="checkbox"
        checked={includes.includes(questionId)}
        onChange={(e) => handler(e.target.checked)}
        className="max-w-[5%] min-w-[5%]"
      />
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
    </section>
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

function FetchData({ fetchDataTypeHandler, setStale, excludeHandler }) {
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
              fetchDataTypeHandler("1", easy);
              setStale(true);
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
              fetchDataTypeHandler("2", medium);
              setStale(true);
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
              fetchDataTypeHandler("3", hard);
              setStale(true);
            }}
            className="bg-red-400 px-6 py-[.6px] rounded border-2 border-red-600"
          >
            Hard
          </button>
        </aside>
        <aside className="mx-4">
          <button
            onClick={() => {
              setFetchCount(total);
              fetchDataTypeHandler("all", total);
            }}
          >
            Retrive All
          </button>

          <h2>
            Total Questions Fetched:<span>{fetchCount}</span>
          </h2>
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
            onClick={excludeHandler}
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
  const result = await queryClient.fetchQuery({
    queryKey: ["questionView", "selectedTechnology", "moduleName"],
    queryFn: getModuleNames,
  });

  return result;
}
