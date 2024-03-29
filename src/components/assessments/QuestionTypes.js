import React from "react";
import QuestionType from "./QuestionView";

function QuestionTypes({
  handler,
  assessment,
  difficultyLevels,
  easyCount,
  mediumCount,
  hardCount,
  warn,
  setWarn,
  queryTotal,
  setCurrentTotal,
  currentTotal,
}) {
  return assessment ? (
    <ul>
      {assessment.map((ele) => (
        <li key={ele}>
          <QuestionType
            handler={handler}
            questionType={ele}
            easyCount={easyCount}
            mediumCount={mediumCount}
            hardCount={hardCount}
            warn={warn}
            currentTotal={currentTotal}
            setCurrentTotal={setCurrentTotal}
            setWarn={setWarn}
            queryTotal={queryTotal}
            difficultyLevels={difficultyLevels}
          />
        </li>
      ))}
    </ul>
  ) : (
    <p>Loading...</p>
  );
}

export default QuestionTypes;
