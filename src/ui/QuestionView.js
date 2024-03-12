<<<<<<< HEAD
<<<<<<< HEAD
import React from "react";

import QuestionViewEditModal from "./questionViews/QuestionViewEditModal";
import QuestionViewModalView from "./questionViews/QuestionViewModalView";

function QuestionView({ data, handler, setter }) {
  let currentCombination;

  if (data?.combination && data?.element?.id) {
    currentCombination = data?.combination[data?.element?.id];
  }

  if (data.popupType === "edit")
    return (
      <QuestionViewEditModal data={data} handler={handler} setter={setter} />
    );
  return (
    <QuestionViewModalView
      data={data}
      handler={handler}
      setter={setter}
      currentCombination={currentCombination}
    />
=======
import React, { useId, useRef } from "react";
import { LocalStorage } from "../services/LocalStorage";
import BuilderService from "../services/builder";
=======
import React from "react";
>>>>>>> origin/master

import QuestionViewEditModal from "./questionViews/QuestionViewEditModal";
import QuestionViewModalView from "./questionViews/QuestionViewModalView";

function QuestionView({ data, handler, setter }) {
  let currentCombination;

  if (data?.combination && data?.element?.id) {
    currentCombination = data?.combination[data?.element?.id];
  }

  if (data.popupType === "edit")
    return (
      <QuestionViewEditModal data={data} handler={handler} setter={setter} />
    );
  return (
<<<<<<< HEAD
    <div
      onClick={(e) => {
        e.stopPropagation();
      }}
      className="z-20"
    >
      <section className="bg-white p-6 rounded-md shadow-md">
        <h1 className="text-2xl font-bold mb-4">Qusetion View</h1>
        <div className="mb-4">
          <h2 className="text-lg font-semibold">Module Name</h2>
          <p className="text-gray-600">{data.selectedModule.moduleName}</p>
        </div>
        <div className="mb-4">
          <h2 className="text-lg font-semibold">Topic Name</h2>
          <p className="text-gray-600">{data.selectedTopic.topicName}</p>
        </div>
        <div className="mb-4">
          <h2 className="text-lg font-semibold">SubTopic Name</h2>
          <p className="text-gray-600">{data.selectedSubTopic.subTopicName}</p>
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
        <div className="grid place-content-center">
          <button
            onClick={submiteHandler}
            className={`text-white font-semibold inline-block px-14 py-2 mx-auto mt-3 bg-green-300 hover:bg-green-400`}
          >
            Submit
          </button>
        </div>
      </section>
    </div>
>>>>>>> origin/main
=======
    <QuestionViewModalView
      data={data}
      handler={handler}
      setter={setter}
      currentCombination={currentCombination}
    />
>>>>>>> origin/master
  );
}

export default QuestionView;
