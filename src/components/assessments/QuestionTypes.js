import React from "react";
import QuestionType from "./QuestionView";

function QuestionTypes({ handler, assessment, difficultyLevels }) {
  return assessment ? (
    <ul>
      {assessment.map((ele) => (
        <li key={ele}>
          <QuestionType
            handler={handler}
            questionType={ele}
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
