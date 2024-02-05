import React, { useContext } from "react";
import AssessmentQuestionBox from "../AssessmentQuestionbox";
import BuilderService from "../../services/builder";
import TopicsContext from "../../context/topicsContext";
import QuestionViewTopic from "./QuestionViewTopic";

const Titles = ["MCQ", "MCQ"];

function AsssessmentQuestionBoxHandler({
  stale,
  setStale,
  questionView,
  setQuestionView,
}) {
  const MCQDifficulty = BuilderService.getDifficultyByTitle(Titles[0]);

  return (
    <section className="overflow-auto container flex">
      <AssessmentQuestionBox
        title={Titles[0]}
        setStale={setStale}
        easy={MCQDifficulty.easy}
        medium={MCQDifficulty.medium}
        hard={MCQDifficulty.hard}
      />
      {questionView &&
        questionView[0]?.name &&
        questionView.map((element) => {
          return (
            <QuestionViewTopic
              key={element.id}
              title={element.name}
              setStale={setStale}
              easy={element.easy}
              medium={element.medium}
              hard={element.hard}
            />
          );
        })}
    </section>
  );
}

export default AsssessmentQuestionBoxHandler;
