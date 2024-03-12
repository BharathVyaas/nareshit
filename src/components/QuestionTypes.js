import React, { useEffect, useRef } from "react";
<<<<<<< HEAD
import AssessmentService from "../services/assessmentsService";
import { LocalStorage } from "../services/LocalStorage";
import BuilderService from "../services/builder";
=======
>>>>>>> origin/main

function QuestionTypes({
  questionType,
  data,
  setData,
  dataQuestions,
  setDataQuestions,
  dataDifficulty,
  setDataDifficulty,
<<<<<<< HEAD
  queryEasy,
  queryMedium,
  queryHard,
  queryTotal,
=======
>>>>>>> origin/main
}) {
  return (
    <>
      <label htmlFor="data">
        <input
          className="bg-white ms-4 w-6 scrollHide border-[1px] border-gray-400 rounded"
          id="data"
          name="data"
          type="checkbox"
          value={data}
          checked
          disabled
<<<<<<< HEAD
          onChange={() => {
            setData((prev) => !prev);
          }}
=======
          onChange={() => setData((prev) => !prev)}
>>>>>>> origin/main
        />
        {questionType}
      </label>

      {data && (
        <section className="p-5">
          <NumberOfQuestions
            dataQuestions={dataQuestions}
            setDataQuestions={setDataQuestions}
<<<<<<< HEAD
            queryTotal={queryTotal}
          />
          <fieldset>
            <legend>Difficulty Levels:</legend>
            <div className="ms-6 mt-4">
=======
          />
          <fieldset>
            <legend>Difficulty Levels:</legend>
            <div className="ms-6 mt-2">
>>>>>>> origin/main
              <DifficultyLevel
                difficultyLevel="easy"
                dataDifficulty={dataDifficulty}
                dataQuestions={dataQuestions}
                setDataDifficulty={setDataDifficulty}
<<<<<<< HEAD
                queryData={queryEasy}
=======
>>>>>>> origin/main
              />
              <DifficultyLevel
                difficultyLevel="medium"
                dataDifficulty={dataDifficulty}
                dataQuestions={dataQuestions}
                setDataDifficulty={setDataDifficulty}
<<<<<<< HEAD
                queryData={queryMedium}
=======
>>>>>>> origin/main
              />
              <DifficultyLevel
                difficultyLevel="hard"
                dataDifficulty={dataDifficulty}
                dataQuestions={dataQuestions}
                setDataDifficulty={setDataDifficulty}
<<<<<<< HEAD
                queryData={queryHard}
=======
>>>>>>> origin/main
              />
            </div>
          </fieldset>
        </section>
      )}
    </>
  );
}

export default QuestionTypes;

function DifficultyLevel({
  difficultyLevel,
  dataDifficulty,
  setDataDifficulty,
  dataQuestions,
<<<<<<< HEAD
  queryData,
}) {
=======
}) {
  const ref = useRef();

>>>>>>> origin/main
  return (
    <label htmlFor="dataEasy">
      {difficultyLevel}:
      <input
        className="bg-white ms-2 me-4 w-16 scrollHide border-[1px] border-gray-400 rounded"
        type="number"
        id="dataEasy"
        name="dataEasy"
<<<<<<< HEAD
        defaultValue={
          queryData ||
          LocalStorage.data?.assessmentData?.MCQ?.difficulty[difficultyLevel] ||
          0
        }
        onChange={(e) =>
          setDataDifficulty((prev) => {
            const obj = { ...prev };

            BuilderService.assessmentService =
              AssessmentService.updateDifficulty({
                ...AssessmentService.getDifficulty(),
                [difficultyLevel]: Number(e.target.value),
              });

            LocalStorage.data.assessmentData.MCQ.difficulty[difficultyLevel] =
              Number(e.target.value);
            obj[difficultyLevel] = Number(e.target.value);
            return obj;
=======
        ref={ref}
        value={dataDifficulty[difficultyLevel]}
        onChange={(e) =>
          setDataDifficulty((prev) => {
            let total =
              dataDifficulty.easy +
              dataDifficulty.medium +
              dataDifficulty.hard -
              dataDifficulty[difficultyLevel] +
              Number(e.target.value);
            let newData;
            if (total <= dataQuestions) {
              ref.current.style.outline = "";
              newData = {
                ...dataDifficulty,
                [difficultyLevel]: Number(e.target.value),
              };
            } else {
              ref.current.style.outline = "2px solid red";
              newData = prev;
            }

            return newData;
>>>>>>> origin/main
          })
        }
      />
    </label>
  );
}

export function NumberOfQuestions({ dataQuestions, setDataQuestions }) {
  return (
    <label htmlFor="dataNo.Q">
      Number of Questions:
      <input
        className="bg-white mb-4 ms-2 w-16 scrollHide border-[1px] border-gray-400 rounded"
        type="number"
        name="No.Q-secondary"
<<<<<<< HEAD
        defaultValue={
          LocalStorage.data?.assessmentData?.MCQ?.totalQuestions || 0
        }
=======
        value={dataQuestions}
>>>>>>> origin/main
        onChange={(e) => setDataQuestions(Number(e.target.value))}
      />
    </label>
  );
}
