import axios from "axios";
import React, { useEffect, useState } from "react";
import { Questions } from "../pages/QuestionView";
import { AnimatePresence, motion } from "framer-motion";
import { useLocation } from "react-router";

function getURL(type, currentCombination) {
  let DifficultyLevelID = 1;

  if (type === "easy") {
    DifficultyLevelID = 1;
  } else if (type === "medium") {
    DifficultyLevelID = 2;
  } else if (type === "hard") {
    DifficultyLevelID = 3;
  }

  return `https://www.nareshit.net/fetchFixedQuestions?DifficultyLevelID=${DifficultyLevelID}&ModuleID=${
    currentCombination.ModuleID
  }&TopicID=${
    Number(currentCombination.TopicID) === 0 ? null : currentCombination.TopicID
  }&SubTopicID=${
    Number(currentCombination.SubTopicID) === 0
      ? null
      : currentCombination.SubTopicID
  }`;
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

  const currentEasy = currentCombination?.easy;
  const currentMedium = currentCombination?.medium;
  const currentHard = currentCombination?.hard;

  const [currentTotal, setCurrentTotal] = useState(null);

  // used to update current include value in modal
  const [currentValue, setCurrentValue] = useState();

  useEffect(() => {
    if (data.type === "easy") {
      setCurrentTotal(queryEasy);
      setCurrentValue(currentEasy);
    }

    if (data.type === "medium") {
      setCurrentTotal(queryMedium);
      setCurrentValue(currentMedium);
    }

    if (data.type === "hard") {
      setCurrentTotal(queryHard);
      setCurrentValue(currentHard);
    }
  }, [
    data.type,
    currentEasy,
    currentHard,
    currentMedium,
    queryEasy,
    queryMedium,
    queryHard,
  ]);

  // ...
  const key = currentCombination.id;
  const [includes, setIncludes] = useState({
    [key]: {
      easy: currentCombination?.includes?.easy?.includes || [],
      medium: currentCombination?.includes?.medium?.includes || [],
      hard: currentCombination?.includes?.hard?.includes || [],
    },
  });

  console.log(data);

  const postIncludes = async (obj) => {
    let includesArr = [];
    Object.values(obj[data.modalData?.id]).forEach((ele) => {
      if (ele) {
        ele.forEach((item) => includesArr.push(item));
      }
    });
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
  }, [currentCombination, type]);

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
  currentIncludes,
  currentValue,
}) {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const TestID = queryParams.get("TestID") || 0;
  const TestDetailsID = queryParams.get("TestDetailsID");
  const technologyId = queryParams.get("TechnologyID");
  const technologyName = queryParams.get("TechnologyName");

  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitHandler = async () => {
    if (isSubmitting) return;
    let includesArr = [];
    Object.values(includes[data.modalData?.id]).forEach((ele) => {
      if (ele) {
        ele.forEach((item) => includesArr.push(item));
      }
    });

    setIsSubmitting(true);

    const res = await axios.post(
      "https://www.nareshit.net/InsertionQuestionView",
      {
        TechnologyId: technologyId,
        TechnologyName: technologyName,
        ModuleName: data?.modalData?.selectedModule,
        ModuleId: data?.modalData?.ModuleID,
        TopicName: data?.modalData?.selectedSubTopic,
        TopicId: data?.modalData?.TopicID,
        SubtopicName: data?.modalData?.selectedTopic,
        SubtopicId: data?.modalData?.SubTopicID,
        EasyCount: data?.element?.easy,
        MediumCount: data?.element?.medium,
        HardCount: data?.element?.hard,
        TestId: TestID,
        TestDetailsId: TestDetailsID,
        SelectedQuestions: [...new Set(includesArr)].join(","),
      }
    );

    console.log(
      "url",
      "https://www.nareshit.net/InsertionQuestionView",
      "data",
      {
        TechnologyId: technologyId,
        TechnologyName: technologyName,
        ModuleName: data?.modalData?.selectedModule,
        ModuleId: data?.modalData?.ModuleID,
        TopicName: data?.modalData?.selectedSubTopic,
        TopicId: data?.modalData?.TopicID,
        SubtopicName: data?.modalData?.selectedTopic,
        SubtopicId: data?.modalData?.SubTopicID,
        EasyCount: data?.element?.easy,
        MediumCount: data?.element?.medium,
        HardCount: data?.element?.hard,
        TestId: TestID,
        TestDetailsId: TestDetailsID,
        SelectedQuestions: [...new Set(includesArr)].join(","),
      },
      "res",
      res
    );

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
        {isSubmitting ? "Loading..." : "Submit"}
      </button>
    </div>
  );
}
