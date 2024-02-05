import React, { useId, useRef } from "react";

function TopicModal({ question, setModalData, data, handler }) {
  const easyRef = useRef();
  const mediumRef = useRef();
  const hardRef = useRef();
  const id = useId();

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
    result.easy = Number(easyRef.current?.value);
    result.medium = Number(mediumRef.current?.value);
    result.hard = Number(hardRef.current?.value);

    console.log(result);
  }
  return (
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
  );
}

export default TopicModal;
