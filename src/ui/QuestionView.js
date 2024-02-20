import React, { useContext, useId, useRef, useState } from "react";
import { LocalStorage } from "../services/LocalStorage";
import BuilderService from "../services/builder";
import QuestionViewCtx from "../context/questionView";
import { useLocation } from "react-router";

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

function QuestionView({ data, handler, setter }) {
  if (data.popupType === "edit")
    return (
      <QuestionViewEditModal data={data} handler={handler} setter={setter} />
    );
  return <h1>hi</h1>;
}

export default QuestionView;

function QuestionViewEditModal({ data, handler, setter }) {
  console.log("data", data);
  // max total values
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const queryEasy = queryParams.get("easy") || 0;
  const queryMedium = queryParams.get("medium") || 0;
  const queryHard = queryParams.get("hard") || 0;

  const easyRef = useRef();
  const mediumRef = useRef();
  const hardRef = useRef();
  const id = useId;
  const [isValid, setIsValid] = useState(true);

  const { easyTotal, mediumTotal, hardTotal } = getTotal(data);

  let result = getResult(data, id);

  function submiteHandler() {
    let go = 0;

    // if every thing is okey.
    if (easyTotal + Number(easyRef.current.value) <= queryEasy) go++;
    if (mediumTotal + Number(mediumRef.current.value) <= queryMedium) go++;
    if (hardTotal + Number(hardRef.current.value) <= queryHard) go++;
    if (go > 2) {
      result.easy = Number(easyRef.current.value);
      result.medium = Number(mediumRef.current.value);
      result.hard = Number(hardRef.current.value);

      handler(result);
      setter(false);
      setIsValid(true);
    }
  }
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
      }}
      className="z-20"
    >
      <section className="bg-white p-10 rounded-md shadow-md">
        <div className="flex justify-between">
          <span className="text-2xl font-bold mb-4">Qusetion View</span>
          <span
            className="cursor-pointer text-[1.8rem] -mt-[4px] font-bold text-pretty"
            onClick={() => setter(false)}
          >
            &times;
          </span>
        </div>
        <div className="mb-4">
          <h2 className="text-lg font-semibold">Module Name</h2>
          <p className="text-gray-600">
            {result.selectedModule || "None Selected"}
          </p>
        </div>
        <div className="mb-4">
          <h2 className="text-lg font-semibold">Topic Name</h2>
          <p className="text-gray-600">
            {result.selectedTopic || "None Selected"}
          </p>
        </div>
        <div className="mb-4">
          <h2 className="text-lg font-semibold">SubTopic Name</h2>
          <p className="text-gray-600">
            {result.selectedSubTopic || "None Selected"}
          </p>
        </div>
        <div className="flex space-x-4">
          <label className="flex items-center" htmlFor="topiceasy">
            Easy:
            <input
              ref={easyRef}
              id="topiceasy"
              type="number"
              className="border rounded-md w-10 px-2 py-1 ml-2"
              defaultValue={result.easy}
            />
          </label>
          <label className="flex items-center" htmlFor="topicmedium">
            Medium:
            <input
              ref={mediumRef}
              id="topicmedium"
              type="number"
              className="border rounded-md w-10 px-2 py-1 ml-2"
              defaultValue={result.medium}
            />
          </label>
          <label className="flex items-center" htmlFor="topichard">
            Hard:
            <input
              ref={hardRef}
              id="topichard"
              type="number"
              className="border rounded-md w-10 px-2 py-1 ml-2"
              defaultValue={result.hard}
            />
          </label>
        </div>
        <div className="grid place-content-center mt-2">
          {!isValid && (
            <p className="text-red-800 font-semibold absloute">
              Try Entering Smaller Value!
            </p>
          )}
          <button
            onClick={submiteHandler}
            className={`text-white font-semibold inline-block px-14 py-2 mx-auto mt-3 bg-green-300 hover:bg-green-400`}
          >
            Submit
          </button>
        </div>
      </section>
    </div>
  );
}

/**
 * let go = false;

    let easy = 0;
    let medium = 0;
    let hard = 0;

    LocalStorage.questionView.forEach((element) => (easy += element.easy));
    LocalStorage.questionView.forEach((element) => (medium += element.medium));
    LocalStorage.questionView.forEach((element) => (hard += element.hard));

    result.easy = Number(easyRef.current?.value);
    result.medium = Number(mediumRef.current?.value);
    result.hard = Number(hardRef.current?.value);

    const finelEasy = result.easy + easy;
    const finelMedium = result.medium + medium;
    const finelHard = result.hard + hard;

    setCtxData([]);

    if (
      finelEasy <= LocalStorage.data.assessmentData.MCQ.difficulty.easy &&
      finelMedium <= LocalStorage.data.assessmentData.MCQ.difficulty.medium &&
      finelHard <= LocalStorage.data.assessmentData.MCQ.difficulty.hard
    ) {
      go = true;
      handler(result);
      setter(false);
      setIsValid(true);
      LocalStorage.questionView = LocalStorage.questionView;

      // ..
    }

    if (!go) {
      setIsValid(false);
      if (finelEasy > LocalStorage.data.assessmentData.MCQ.difficulty.easy) {
        easyRef.current.style.border = "2px solid red";
      } else if (
        finelEasy <= LocalStorage.data.assessmentData.MCQ.difficulty.easy
      ) {
        easyRef.current.style.border = "1px solid gray";
      }
      if (
        finelMedium > LocalStorage.data.assessmentData.MCQ.difficulty.medium
      ) {
        mediumRef.current.style.border = "2px solid red";
      } else if (
        finelMedium <= LocalStorage.data.assessmentData.MCQ.difficulty.medium
      ) {
        mediumRef.current.style.border = "1px solid gray";
      }
      if (finelHard > LocalStorage.data.assessmentData.MCQ.difficulty.medium) {
        hardRef.current.style.border = "2px solid red";
      } else if (
        finelHard <= LocalStorage.data.assessmentData.MCQ.difficulty.medium
      ) {
        hardRef.current.style.border = "1px solid gray";
      } else {
        throw new Error("unexpected error QuestionView submitHandler");
      }
    }
    
 */
