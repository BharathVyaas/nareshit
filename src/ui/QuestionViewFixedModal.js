import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { Questions } from "../pages/QuestionView";
import { AnimatePresence, motion } from "framer-motion";
import { LocalStorage } from "../services/LocalStorage";
import BuilderService from "../services/builder";

let COUNT = 0;

function QuestionViewFixedModal({ data, setter, handler }) {
  const [questions, setQuestions] = useState([]);

  const total = { easy: 0, medium: 0, hard: 0 };
  const moduleId = data.element.element.selectedModule.moduleId || 0;
  const topicId = data.element.element.selectedTopic.topicId || 0;
  const subTopicId = data.element.element.selectedSubTopic.subTopicId || 0;

  const [includesCount, setIncludesCount] = useState(
    LocalStorage.includes.length
  );

  function modalHandler(data) {
    setIncludesCount(LocalStorage.includes.length);
  }

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

  const totalCount =
    BuilderService.assessmentService.options.MCQ.totalQuestions;

  const [includeContent, setIncludeContent] =
    useState(`Total Questions Included: ${
      includesCount > 30 ? 30 : includesCount
    }/
    ${totalCount}`);

  useEffect(() => {
    if (includesCount > totalCount) {
      if (COUNT < includesCount) {
        window.alert(
          `Selected questions should not exceed ${totalCount} remove ${Math.abs(
            Number(totalCount) - Number(includesCount)
          )} questions`
        );
      }
      COUNT = includesCount;

      //...
    } else if (
      includeContent !==
      `Total Questions Included: ${includesCount > 30 ? 30 : includesCount}/
  ${totalCount}`
    ) {
      setIncludeContent(`Total Questions Included: ${
        includesCount > 30 ? 30 : includesCount
      }/
    ${totalCount}`);
    }
  }, [includesCount]);

  return (
    <AnimatePresence>
      <motion.div
        className=""
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div
          className="mb-5 flex justify-between text-nowrap"
          onClick={(e) => e.preventDefault()}
        >
          <h2 className="text-blue-700 flex flex-wrap">
            <span className="px-4 underline underline-offset-2">
              {data.element.element.selectedModule.moduleName}
            </span>
            <span className="px-4 underline underline-offset-2">
              {data.element.element.selectedTopic.topicName}
            </span>
            <span className="px-4 underline underline-offset-2">
              {data.element.element.selectedSubTopic.subTopicName}
            </span>
          </h2>
          <button
            className="cursor-pointer font-bold text-pretty me-4 text-red-600"
            onClick={() => setter(false)}
          >
            X
          </button>
        </div>
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          end={{ opacity: 0, height: 0 }}
          className="max-h-[24rem] border-2 overflow-y-scroll overflow-x-hidden"
        >
          {questions && (
            <Questions modalHandler={modalHandler} questions={questions} />
          )}
        </motion.div>
        <div className="mt-4 text-center flex">
          <p className="py-2">{includeContent}</p>
          <button className="inline-block px-14 py-2 mx-auto bg-green-300 hover:bg-green-400">
            Submit
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default QuestionViewFixedModal;
