import React from "react";

function QuestionTypes({
  questionType,
  data,
  setData,
  dataQuestions,
  setDataQuestions,
  dataDifficulty,
  setDataDifficulty,
}) {
  return (
    <>
      <label htmlFor="data">
        <input
          className="bg-white ms-4 w-6 scrollHide border-[1px] border-gray-400 rounded"
          id="data"
          name="data"
          type="checkbox"
          checked
          value={data}
          onClick={() => setData((prev) => !prev)}
        />
        {questionType}
      </label>

      {data && (
        <section className="p-5">
          <NumberOfQuestions
            dataQuestions={dataQuestions}
            setDataQuestions={setDataQuestions}
          />
          <fieldset>
            <legend>Difficulty Levels:</legend>
            <div className="ms-6 mt-2">
              <DifficultyLevel
                difficultyLevel="easy"
                dataDifficulty={dataDifficulty}
                setDataDifficulty={setDataDifficulty}
              />
              <DifficultyLevel
                difficultyLevel="medium"
                dataDifficulty={dataDifficulty}
                setDataDifficulty={setDataDifficulty}
              />
              <DifficultyLevel
                difficultyLevel="hard"
                dataDifficulty={dataDifficulty}
                setDataDifficulty={setDataDifficulty}
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
}) {
  return (
    <label htmlFor="dataEasy">
      {difficultyLevel}:
      <input
        className="bg-white ms-2 me-4 w-16 scrollHide border-[1px] border-gray-400 rounded"
        type="number"
        id="dataEasy"
        name="dataEasy"
        value={dataDifficulty[difficultyLevel]}
        onChange={(e) =>
          setDataDifficulty((prev) => {
            return { ...prev, [difficultyLevel]: Number(e.target.value) };
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
        value={dataQuestions}
        onChange={(e) => setDataQuestions(e.target.value)}
      />
    </label>
  );
}
