import axios from "axios";
import React, { useEffect, useState } from "react";
import { Questions } from "../pages/QuestionView";

function QuestionViewFixedModal({ data, setter, handler }) {
  const [questions, setQuestions] = useState([]);

  const total = { easy: 0, medium: 0, hard: 0 };
  const moduleId = data.element.element.selectedModule.moduleId || 0;
  const topicId = data.element.element.selectedTopic.topicId || 0;
  const subTopicId = data.element.element.selectedSubTopic.subTopicId || 0;

  total[data.type] = data.value;

  console.log(
    `https://www.nareshit.net/fetchDynamicQuestions?Hardcount=${total.hard}&MediumCount=${total.medium}&EasyCount=${total.easy}&SubTopicID=${subTopicId}`
  );

  useEffect(() => {
    axios
      .get(
        `https://www.nareshit.net/fetchDynamicQuestions?Hardcount=${1}&MediumCount=${2}&EasyCount=${20}&SubTopicID=${173}`
      )
      .then((res) => {
        console.log(res);
        setQuestions(res.data);
      });
  }, []);

  return (
    <div
      className=""
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div className="mb-5">
        <h2>Question View</h2>
      </div>
      <div className="max-h-[24rem] border-2 overflow-y-scroll overflow-x-hidden">
        {questions && <Questions questions={questions} />}
      </div>
      <div className="mt-4 text-center">
        <button className="inline-block px-14 py-2 mx-auto bg-green-300 hover:bg-green-400">
          Submit
        </button>
      </div>
    </div>
  );
}

export default QuestionViewFixedModal;
