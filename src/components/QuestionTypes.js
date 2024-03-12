import React, { useEffect, useRef } from "react";
<<<<<<< HEAD
<<<<<<< HEAD
import AssessmentService from "../services/assessmentsService";
import { LocalStorage } from "../services/LocalStorage";
import BuilderService from "../services/builder";
=======
>>>>>>> origin/main
=======
import AssessmentService from "../services/assessmentsService";
import { LocalStorage } from "../services/LocalStorage";
import BuilderService from "../services/builder";
>>>>>>> origin/master

function QuestionTypes({
  questionType,
  data,
  setData,
  dataQuestions,
  setDataQuestions,
  dataDifficulty,
  setDataDifficulty,
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> origin/master
  queryEasy,
  queryMedium,
  queryHard,
  queryTotal,
<<<<<<< HEAD
=======
>>>>>>> origin/main
=======
>>>>>>> origin/master
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
<<<<<<< HEAD
          onChange={() => {
            setData((prev) => !prev);
          }}
=======
          onChange={() => setData((prev) => !prev)}
>>>>>>> origin/main
=======
          onChange={() => {
            setData((prev) => !prev);
          }}
>>>>>>> origin/master
        />
        {questionType}
      </label>

      {data && (
        <section className="p-5">
          <NumberOfQuestions
            dataQuestions={dataQuestions}
            setDataQuestions={setDataQuestions}
<<<<<<< HEAD
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
=======
            queryTotal={queryTotal}
          />
          <fieldset>
            <legend>Difficulty Levels:</legend>
            <div className="ms-6 mt-4">
>>>>>>> origin/master
              <DifficultyLevel
                difficultyLevel="easy"
                dataDifficulty={dataDifficulty}
                dataQuestions={dataQuestions}
                setDataDifficulty={setDataDifficulty}
<<<<<<< HEAD
<<<<<<< HEAD
                queryData={queryEasy}
=======
>>>>>>> origin/main
=======
                queryData={queryEasy}
>>>>>>> origin/master
              />
              <DifficultyLevel
                difficultyLevel="medium"
                dataDifficulty={dataDifficulty}
                dataQuestions={dataQuestions}
                setDataDifficulty={setDataDifficulty}
<<<<<<< HEAD
<<<<<<< HEAD
                queryData={queryMedium}
=======
>>>>>>> origin/main
=======
                queryData={queryMedium}
>>>>>>> origin/master
              />
              <DifficultyLevel
                difficultyLevel="hard"
                dataDifficulty={dataDifficulty}
                dataQuestions={dataQuestions}
                setDataDifficulty={setDataDifficulty}
<<<<<<< HEAD
<<<<<<< HEAD
                queryData={queryHard}
=======
>>>>>>> origin/main
=======
                queryData={queryHard}
>>>>>>> origin/master
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
<<<<<<< HEAD
  queryData,
}) {
=======
}) {
  const ref = useRef();

>>>>>>> origin/main
=======
  queryData,
}) {
>>>>>>> origin/master
  return (
    <label htmlFor="dataEasy">
      {difficultyLevel}:
      <input
        className="bg-white ms-2 me-4 w-16 scrollHide border-[1px] border-gray-400 rounded"
        type="number"
        id="dataEasy"
        name="dataEasy"
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> origin/master
        defaultValue={
          queryData ||
          LocalStorage.data?.assessmentData?.MCQ?.difficulty[difficultyLevel] ||
          0
        }
<<<<<<< HEAD
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
=======
>>>>>>> origin/master
        onChange={(e) =>
          setDataDifficulty((prev) => {
            const obj = { ...prev };

<<<<<<< HEAD
            return newData;
>>>>>>> origin/main
=======
            BuilderService.assessmentService =
              AssessmentService.updateDifficulty({
                ...AssessmentService.getDifficulty(),
                [difficultyLevel]: Number(e.target.value),
              });

            LocalStorage.data.assessmentData.MCQ.difficulty[difficultyLevel] =
              Number(e.target.value);
            obj[difficultyLevel] = Number(e.target.value);
            return obj;
>>>>>>> origin/master
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
<<<<<<< HEAD
        defaultValue={
          LocalStorage.data?.assessmentData?.MCQ?.totalQuestions || 0
        }
=======
        value={dataQuestions}
>>>>>>> origin/main
=======
        defaultValue={
          LocalStorage.data?.assessmentData?.MCQ?.totalQuestions || 0
        }
>>>>>>> origin/master
        onChange={(e) => setDataQuestions(Number(e.target.value))}
      />
    </label>
  );
}
