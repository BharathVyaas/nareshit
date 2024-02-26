import axios from "axios";
import React, { useEffect, useId, useMemo, useState } from "react";
import { Questions } from "../pages/QuestionView";
import { AnimatePresence, motion } from "framer-motion";
import { LocalStorage } from "../services/LocalStorage";
import BuilderService from "../services/builder";
import { useLocation } from "react-router";

let COUNT = 0;
let CURRENT_COUNT = 0;

function getURL(type, currentCombination) {
  let DifficultyLevelID = 1;

  if (type === "easy") {
    DifficultyLevelID = 1;
  } else if (type === "medium") {
    DifficultyLevelID = 2;
  } else if (type == "hard") {
    DifficultyLevelID = 3;
  }

  return `https://www.nareshit.net/fetchFixedQuestions?DifficultyLevelID=${DifficultyLevelID}&ModuleID=${
    currentCombination.ModuleID
  }&TopicID=${
    currentCombination.TopicID == 0 ? null : currentCombination.TopicID
  }&SubTopicID=${
    currentCombination.SubTopicID == 0 ? null : currentCombination.SubTopicID
  }`;
}

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

  const postIncludes = (obj) => {
    let includesArr = [];
    Object.values(obj[data.modalData?.id]).map((ele) => {
      if (ele) {
        ele.forEach((item) => includesArr.push(item));
      }
    });

    console.log("data", includesArr);
  };

  function modalHandler(flag, question) {
    /* if (flag) {
      if (includes[key][data.type]?.length === 5)
        if (includes[key][data.type]?.length + 1 > currentValue) {
          window.alert("Must remove one question before inserting new");
        }
    } */
    if (
      flag &&
      Object.values(includes)[0][data.type].length <=
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
        if (
          obj[data.modalData?.id] &&
          !obj[data.modalData?.id][data?.type].includes(question.QuestionID)
        ) {
          obj[data.modalData?.id][data?.type].push(question.QuestionID);
        }
        // to post the new included object
        postIncludes(obj);

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

        if (
          obj[data.modalData?.id] &&
          obj[data.modalData?.id][data?.type].includes(question.QuestionID)
        ) {
          const index = obj[data.modalData?.id][data?.type].indexOf(
            question.QuestionID
          );
          obj[data.modalData?.id][data?.type].splice(index, 1); // Remove the element at the found index
        }

        // to post the new included object
        postIncludes(obj);

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
          currentIncludes={includes[key][data.type]?.length}
          setCurrentValue={setCurrentValue}
        />

        <QuestionViewFixedModalFooter
          data={data}
          includes={includes}
          handler={parentHandler}
          setter={setter}
          currentTotal={currentTotal}
          currentIncludes={includes[key][data.type]?.length}
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
  currentIncludes,
}) {
  const [questions, setQuestions] = useState([]);

  console.log(currentCombination);

  useEffect(() => {
    console.log(getURL(type, currentCombination));
    axios.get(getURL(type, currentCombination)).then((res) => {
      console.log("res", res);
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
          currentIncludes={currentIncludes}
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
  currentIncludes,
  currentValue,
}) {
  const submitHandler = () => {
    handler(includes, data.type);
    setter(false);
  };

  return (
    <div className="mt-4 text-center flex w-[50vw]">
      <p className="py-2 ms-10">
        current count: {currentIncludes || 0}/{currentValue || 0}
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
