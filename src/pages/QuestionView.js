import React, { useState, useEffect } from "react";
import QusetionViewTechnlogy from "../components/questionView/QuestionView";
import { getModuleNames, queryClient } from "../util/http";
import QuestionViewService from "../services/questionViewService";
import BuilderService from "../services/builder";
import TechnologyService from "../services/technologyService";
import Button from "../ui/Button";
import questionList from "../util/question.json";
import AssessmentQuestionBox from "../components/AssessmentQuestionbox";

import { AnimatePresence, motion } from "framer-motion";
import { LocalStorage } from "../services/LocalStorage";

const Titles = ["MCQ"];

function QuestionView() {
  const [selectedTechnology, setSelectedTechnology] = useState({});

  const [_, setStale] = useState(false);

  (() => {
    return _;
  })();

  LocalStorage.data = BuilderService.getData();

  QuestionViewService.updateSelectedTechnology(selectedTechnology);

  const MCQDifficulty = BuilderService.getDifficultyByTitle(Titles[0]);
  const selectTechnology =
    TechnologyService.technology?.programmingLanguage?.programmingLanguage;

  return (
    <AnimatePresence>
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
            selectedTechnology={selectedTechnology}
            setSelectedTechnology={setSelectedTechnology}
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
        <section className="flex">
          <FetchData />
        </section>
        <section className="bg-rose-200">
          <Questions x={BuilderService.getTotal()} />
        </section>

        <Button link="/categories/sheduletime" />
      </motion.main>
    </AnimatePresence>
  );
}

export default QuestionView;

function Questions({ x }) {
  const questions = [];

  for (let i = 0; i < x; i++) {
    questions.push(questionList[i]);
  }

  return (
    <>
      {questions.map((question) => (
        <section
          key={question.QuestionID}
          className="scroll flex items-center border-2 border-white overflow-auto justify-between"
        >
          <h2 className="max-w-[20%] min-w-[12%]">Selected Question</h2>
          <article className="max-w-[20%] min-w-[20%] overflow-hidden ">
            <h3>Description</h3>
            <p>{question.Description || "Must be Included"}</p>
          </article>
          <Option option="Option1" question={question} questionKey="OptionA" />
          <Option option="Option2" question={question} questionKey="OptionB" />
          <Option option="Option3" question={question} questionKey="OptionC" />
          <Option option="Option4" question={question} questionKey="OptionD" />
        </section>
      ))}
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

function FetchData() {
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

  return (
    <>
      <aside className="mx-4">
        <h2>
          Easy Count:<span>{easy}</span>
        </h2>

        <button>Easy</button>
      </aside>

      <aside className="mx-4">
        <h2>
          Medium Count:<span>{medium}</span>
        </h2>

        <button>Medium</button>
      </aside>
      <aside className="mx-4">
        <h2>
          Hard Count: <span>{hard}</span>
        </h2>

        <button>Hard</button>
      </aside>
      <aside className="mx-4">
        <button>Retrive All</button>

        <h2>
          Total Questions Fetched:<span>{total}</span>
        </h2>
      </aside>
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
