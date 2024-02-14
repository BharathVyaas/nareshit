import React, { useContext, useId, useRef, useState } from "react";
import { LocalStorage } from "../services/LocalStorage";
import BuilderService from "../services/builder";
import QuestionViewCtx from "../context/questionView";

function QuestionView({ question, setModalData, data, handler, setter }) {
  const easyRef = useRef();
  const mediumRef = useRef();
  const hardRef = useRef();
  const id = useId();
  const [isValid, setIsValid] = useState(true);
  const { data: questionCtxData, setData: setCtxData } =
    useContext(QuestionViewCtx);

  let result = {
    name: "My Name",
    id,
    selectedModule: data.selectedModule,
    selectedTopic: data.selectedTopic,
    selectedSubTopic: data.selectedSubTopic,
    easy: Number(easyRef.current?.value),
    medium: Number(mediumRef.current?.value),
    hard: Number(hardRef.current?.value),
  };

  function submiteHandler() {
    let go = false;

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
            {data?.selectedModule?.moduleName || "None Selected"}
          </p>
        </div>
        <div className="mb-4">
          <h2 className="text-lg font-semibold">Topic Name</h2>
          <p className="text-gray-600">
            {data.selectedTopic?.topicName || "None Selected"}
          </p>
        </div>
        <div className="mb-4">
          <h2 className="text-lg font-semibold">SubTopic Name</h2>
          <p className="text-gray-600">
            {data.selectedSubTopic?.subTopicName || "None Selected"}
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
            />
          </label>
          <label className="flex items-center" htmlFor="topicmedium">
            Medium:
            <input
              ref={mediumRef}
              id="topicmedium"
              type="number"
              className="border rounded-md w-10 px-2 py-1 ml-2"
            />
          </label>
          <label className="flex items-center" htmlFor="topichard">
            Hard:
            <input
              ref={hardRef}
              id="topichard"
              type="number"
              className="border rounded-md w-10 px-2 py-1 ml-2"
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

export default QuestionView;
