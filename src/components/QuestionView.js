import React, { useEffect, useState } from "react";
import QusetionViewTechnlogy from "./questionView/QuestionView";
import { getModuleNames, queryClient } from "../util/http";
import QuestionViewService from "../services/questionViewService";
import BuilderService from "../services/builder";
import TechnologyService from "../services/technologyService";
import AssessmentService, { MCQService } from "../services/assessmentsService";

import questionList from "../util/question.json";

const Titles = ["MCQ", "coding", "freeText"];

function QuestionView() {
  const [selectedTechnology, setSelectedTechnology] = useState({});

  QuestionViewService.updateSelectedTechnology(selectedTechnology);

  const MCQDifficulty = BuilderService.getDifficultyByTitle(Titles[0]);
  const CodingDifficulty = BuilderService.getDifficultyByTitle(Titles[2]);
  const FreeTextDifficulty = BuilderService.getDifficultyByTitle(Titles[1]);
  const selectTechnology =
    TechnologyService.technology?.programmingLanguage?.programmingLanguage;

  return (
    <main>
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
          easy={MCQDifficulty.easy}
          medium={MCQDifficulty.medium}
          hard={MCQDifficulty.hard}
        />
        <AssessmentQuestionBox
          title={Titles[1]}
          easy={FreeTextDifficulty.easy}
          medium={FreeTextDifficulty.medium}
          hard={FreeTextDifficulty.hard}
        />
        <AssessmentQuestionBox
          title={Titles[2]}
          easy={CodingDifficulty.easy}
          medium={CodingDifficulty.medium}
          hard={CodingDifficulty.hard}
        />
      </section>
      <section className="flex">
        <FetchData />
      </section>
      <section className="bg-rose-200">
        <Questions x={5} />
      </section>
    </main>
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
          <article className="max-w-[20%] min-w-[20%] overflow-hidden">
            <h3>Option1</h3>
            <label htmlFor={question.QuestionID + 1} className="overflow-clip ">
              <input
                id={question.QuestionID + 1}
                type="radio"
                name={question.QuestionID + "option"}
              />
              {question.OptionA}
            </label>
          </article>
          <article className="max-w-[20%] min-w-[20%] overflow-clip">
            <h3>Option2</h3>
            <label htmlFor={question.QuestionID + 2} className="overflow-clip ">
              <input
                id={question.QuestionID + 2}
                type="radio"
                name={question.QuestionID + "option"}
              />
              {question.OptionB}
            </label>
          </article>
          <article className="max-w-[20%] min-w-[20%] overflow-clip">
            <h3>Option3</h3>
            <label htmlFor={question.QuestionID + 3} className="overflow-clip ">
              <input
                id={question.QuestionID + 3}
                type="radio"
                name={question.QuestionID + "option"}
              />
              {question.OptionC}
            </label>
          </article>
          <article className="max-w-[20%] min-w-[20%] overflow-clip">
            <h3>Option4</h3>
            <label htmlFor={question.QuestionID + 4} className="overflow-auto ">
              <input
                id={question.QuestionID + 4}
                type="radio"
                name={question.QuestionID + "option"}
              />
              {question.OptionD}
            </label>
          </article>
        </section>
      ))}
    </>
  );
}

function FetchData() {
  const difficulty = BuilderService.getDifficulty();
  const easy = difficulty
    .map((element) => element.easy)
    .reduce((data, acc) => data + acc, 0);
  const medium = difficulty
    .map((element) => element.medium)
    .reduce((data, acc) => data + acc, 0);
  const hard = difficulty
    .map((element) => element.hard)
    .reduce((data, acc) => data + acc, 0);
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

function AssessmentQuestionBox({ title, easy: _e, medium: _m, hard: _h }) {
  const [easy, setEasy] = useState(_e);
  const [medium, setMedium] = useState(_m);
  const [hard, setHard] = useState(_h);

  useEffect(() => {
    const difficulty = MCQService.getDifficulty();
    AssessmentService.insertOptions(title, {
      key: "difficulty",
      value: MCQService.updateDifficulty({
        ...difficulty,
        easy,
      }).getDifficulty(),
    });
  }, [title, easy]);

  useEffect(() => {
    const difficulty = MCQService.getDifficulty();
    AssessmentService.insertOptions(title, {
      key: "difficulty",
      value: MCQService.updateDifficulty({
        ...difficulty,
        medium,
      }).getDifficulty(),
    });
  }, [title, medium]);

  useEffect(() => {
    const difficulty = MCQService.getDifficulty();
    AssessmentService.insertOptions(title, {
      key: "difficulty",
      value: MCQService.updateDifficulty({
        ...difficulty,
        hard,
      }).getDifficulty(),
    });
  }, [title, hard]);

  return (
    <article className="text-center max-w-[20%] m-5 border-[1.5px] rounded border-black">
      <h2>{title}</h2>
      <div className="flex">
        <div className=" p-3">
          <h3>Easy</h3>
          <input
            type="number"
            className=" w-6"
            defaultValue={easy}
            onChange={(e) => setEasy(Number(e.target.value))}
          />
        </div>
        <div className=" p-3">
          <h3>Medium</h3>
          <input
            type="number"
            className=" w-6 "
            defaultValue={medium}
            onChange={(e) => setMedium(Number(e.target.value))}
          />
        </div>
        <div className=" p-3">
          <h3>Hard</h3>
          <input
            type="number"
            className=" w-6"
            defaultValue={hard}
            onChange={(e) => setHard(Number(e.target.value))}
          />
        </div>
      </div>
    </article>
  );
}

export async function loader() {
  const result = await queryClient.fetchQuery({
    queryKey: ["questionView", "selectedTechnology", "moduleName"],
    queryFn: getModuleNames,
  });

  return result;
}
/**
  const easy = difficulty
    .map((element) => element.easy)
    .reduce((data, acc) => data + acc, 0);

     */
