import React from "react";
import AssessmentQuestionBox from "../AssessmentQuestionbox";
import BuilderService from "../../services/builder";

const Titles = ["MCQ", "MCQ"];

function AsssessmentQuestionBoxHandler({ stale, setStale }) {
  const MCQDifficulty = BuilderService.getDifficultyByTitle(Titles[0]);

  return (
    <>
      <AssessmentQuestionBox
        title={Titles[0]}
        setStale={setStale}
        easy={MCQDifficulty.easy}
        medium={MCQDifficulty.medium}
        hard={MCQDifficulty.hard}
      />
      <AssessmentQuestionBox
        title={Titles[1]}
        setStale={setStale}
        easy={MCQDifficulty.easy}
        medium={MCQDifficulty.medium}
        hard={MCQDifficulty.hard}
      />
    </>
  );
}

export default AsssessmentQuestionBoxHandler;
