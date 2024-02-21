import axios from "axios";
import React, { useEffect, useId, useMemo, useState } from "react";
import { Questions } from "../pages/QuestionView";
import { AnimatePresence, motion } from "framer-motion";
import { LocalStorage } from "../services/LocalStorage";
import BuilderService from "../services/builder";
import { useLocation } from "react-router";

let COUNT = 0;
let CURRENT_COUNT = 0;

// Returns Result Object
function getResult(data, id) {
  let result = {
    id: data?.element?.id || id,
    selectedModule: data?.element?.selectedModule,
    ModuleID: data?.element?.ModuleID,
    selectedTopic: data?.element?.selectedTopic,
    TopicID: data?.element?.TopicID,
    selectedSubTopic: data?.element?.selectedTopic,
    SubTopicID: data?.element?.SubTopicID,
    easy: Number(data?.element?.easy),
    medium: Number(data?.element?.medium),
    hard: Number(data?.element?.hard),
  };

  // when creating new Combination data object is different
  if (data.DataObj) {
    result = {
      id: data?.DataObj?.id || id,
      selectedModule: data?.DataObj?.Module?.ModuleName,
      ModuleID: data?.ModuleID,
      selectedTopic: data?.DataObj?.Topic?.TopicName,
      TopicID: data?.TopicID,
      selectedSubTopic: data?.DataObj?.SubTopic?.SubTopicName,
      SubTopicID: data?.SubTopicID,
      easy: Number(data?.easy),
      medium: Number(data?.medium),
      hard: Number(data?.hard),
    };
  }

  return result;
}

// Returns Total from reducing all combonations.
function getTotal(data) {
  const combinationArr = Object.values(data.combination);

  let easyTotal = combinationArr.reduce(
    (acc, ele) => Number(ele.easy) + acc,
    0
  );
  let mediumTotal = combinationArr.reduce(
    (acc, ele) => Number(ele.medium) + acc,
    0
  );
  let hardTotal = combinationArr.reduce(
    (acc, ele) => Number(ele.hard) + acc,
    0
  );

  // total - current element
  if (
    data.element &&
    (data.element.easy || data.element.medium || data.element.hard)
  ) {
    easyTotal -= Number(data.element.easy);
    mediumTotal -= Number(data.element.medium);
    hardTotal -= Number(data.element.hard);
  }

  if (
    data.DataObj &&
    (data.DataObj.easy || data.DataObj.medium || data.DataObj.hard)
  ) {
    easyTotal -= Number(data.DataObj.easy);
    mediumTotal -= Number(data.DataObj.medium);
    hardTotal -= Number(data.DataObj.hard);
  }

  return { easyTotal, mediumTotal, hardTotal };
}

function QuestionViewFixedModal({
  data,
  setter,
  handler: parentHandler,
  currentCombination,
}) {
  // max total values
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const queryEasy = queryParams.get("easy") || 0;
  const queryMedium = queryParams.get("medium") || 0;
  const queryHard = queryParams.get("hard") || 0;

  const id = useId();

  const { easyTotal, mediumTotal, hardTotal } = getTotal(data);
  let result = getResult(data, id);

  const currentEasy = currentCombination?.easy;
  const currentMedium = currentCombination?.medium;
  const currentHard = currentCombination?.hard;

  let currentTotal;

  // used to update current include value in modal
  const [currentValue, setCurrentValue] = useState();

  useEffect(() => {
    if (data.type === "easy") {
      currentTotal = queryEasy;
      setCurrentValue(currentEasy);
    }

    if (data.type === "medium") {
      currentTotal = queryMedium;
      setCurrentValue(currentMedium);
    }

    if (data.type === "hard") {
      currentTotal = queryHard;
      setCurrentValue(currentHard);
    }
  }, [data.type]);

  // ...
  const key = currentCombination.id;
  const [includes, setIncludes] = useState({
    [key]: {
      easy: currentCombination?.includes?.easy?.includes || [],
      medium: currentCombination?.includes?.medium?.includes || [],
      hard: currentCombination?.includes?.hard?.includes || [],
    },
  });

  console.log("includes", includes);

  function modalHandler(flag, question) {
    if (
      flag &&
      Object.values(includes)[0][data.type].length <
        currentCombination[data.type]
    ) {
      setIncludes((prev) => {
        const obj = { ...prev };
        if (!obj[data.modalData?.id]) {
          obj[data.modalData?.id] = {
            easy: [],
            medium: [],
            hard: [],
          };
        }
        console.log(obj);
        if (
          obj[data.modalData?.id] &&
          !obj[data.modalData?.id][data?.type].includes(question.QuestionID)
        ) {
          obj[data.modalData?.id][data?.type].push(question.QuestionID);
        }
        console.log(obj);
        return obj;
      });
    } else {
      setIncludes((prev) => {
        const obj = { ...prev };
        if (!obj[data.modalData?.id]) {
          obj[data.modalData?.id] = {
            easy: [],
            medium: [],
            hard: [],
          };
        }
        console.log(obj);
        if (
          obj[data.modalData?.id] &&
          obj[data.modalData?.id][data?.type].includes(question.QuestionID)
        ) {
          const index = obj[data.modalData?.id][data?.type].indexOf(
            question.QuestionID
          );
          obj[data.modalData?.id][data?.type].splice(index, 1); // Remove the element at the found index
        }

        console.log(obj);
        setCurrentValue(obj[data.modalData.id.length] || 0);
        return obj;
      });
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        className="p-4"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <QuestionViewFixedModalHeader data={data} setter={setter} />

        <QuestionViewFixedModalBody
          modalHandler={modalHandler}
          currentCombination={currentCombination}
          type={data?.type}
          currentValue={currentValue}
          setCurrentValue={setCurrentValue}
        />

        <QuestionViewFixedModalFooter
          data={data}
          includes={includes}
          handler={parentHandler}
          setter={setter}
          currentTotal={currentTotal}
          currentValue={currentValue}
        />
      </motion.div>
    </AnimatePresence>
  );
}

export default QuestionViewFixedModal;

function QuestionViewFixedModalHeader({ data, setter }) {
  return (
    <div
      className="flex justify-between text-nowrap w-[50vw]"
      onClick={(e) => e.preventDefault()}
    >
      <h2 className="text-blue-700 flex flex-wrap">
        <span className="px-4 pt-4 underline underline-offset-2">
          {data?.element?.selectedModule || "None Selected"}
        </span>
        <span className="px-4 pt-4  underline underline-offset-2">
          {data?.element?.selectedTopic || "None Selected"}
        </span>
        <span className="px-4  pt-4 underline underline-offset-2">
          {data?.element?.selectedSubTopic || "None Selected"}
        </span>
      </h2>
      <button
        className="cursor-pointer font-bold text-pretty me-4 text-[2rem]"
        onClick={() => setter(false)}
      >
        &times;
      </button>
    </div>
  );
}

function QuestionViewFixedModalBody({
  modalHandler,
  currentValue,
  type,
  setCurrentValue,
  currentCombination,
}) {
  const [questions, setQuestions] = useState([]);

  /*   console.log(
    `https://www.nareshit.net/fetchDynamicQuestions?Hardcount=${total?.hard}&MediumCount=${total?.medium}&EasyCount=${total?.easy}&SubTopicID=${subTopicId}`
  ); */

  useEffect(() => {
    axios
      .get(
        `https://www.nareshit.net/fetchDynamicQuestions?Hardcount=${1}&MediumCount=${2}&EasyCount=${20}&SubTopicID=${173}`
      )
      .then((res) => {
        /* console.log(res); */
        setQuestions(res.data);
      });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      end={{ opacity: 0, height: 0 }}
      className="max-h-[24rem] w-[50vw] border-2 border-gray-300 overflow-y-scroll overflow-x-hidden"
    >
      {questions && (
        <Questions
          modalHandler={modalHandler}
          questions={questions}
          type={type}
          currentCombination={currentCombination}
          currentValue={currentValue}
          setCurrentValue={setCurrentValue}
        />
      )}
    </motion.div>
  );
}

function QuestionViewFixedModalFooter({
  data,
  includes,
  handler,
  setter,
  currentTotal,
  currentValue,
}) {
  const submitHandler = () => {
    handler(includes, data.type);
    setter(false);
  };

  return (
    <div className="mt-4 text-center flex w-[50vw]">
      <p className="py-2 ms-10">
        current count: {currentValue}/{currentTotal || 0}
      </p>
      <button
        onClick={submitHandler}
        className="inline-block max-h-10 px-14 py-2 mx-auto bg-green-300 hover:bg-green-400"
      >
        Submit
      </button>
    </div>
  );
}
