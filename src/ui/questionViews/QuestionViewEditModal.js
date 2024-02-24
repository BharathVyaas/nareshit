import axios from "axios";
import { includes } from "lodash";
import { useEffect, useId, useRef, useState } from "react";
import { useLocation } from "react-router";

import CryptoJS from "crypto-js";

// Returns Result Object
function getResult(data, id) {
  const timestamp = new Date().getTime().toString(); // Get current timestamp
  const randomString = Math.random().toString(36).substring(2, 10); // Generate a random string
  const combinedString = timestamp + randomString; // Combine timestamp and random string
  const encoded = btoa(combinedString); // Base64 encode the combined string
  const smallerId = encoded.substring(0, 8) + id; // Take the first 8 characters

  let result = {
    id: data?.element?.id || smallerId,
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
      id: data?.DataObj?.id || smallerId,
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
  console.log(data);
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

function QuestionViewEditModal({ data, handler, setter }) {
  /* console.log("data", data); */
  // max total values
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const TestID = queryParams.get("TestID") || 0;
  const TestDetailsID = queryParams.get("TestDetailsID") || 0;
  const technologyId = queryParams.get("TechnologyID") || 0;
  const technologyName = queryParams.get("TechnologyName") || 0;
  const queryEasy = queryParams.get("easy") || 0;
  const queryMedium = queryParams.get("medium") || 0;
  const queryHard = queryParams.get("hard") || 0;

  const easyRef = useRef();
  const mediumRef = useRef();
  const hardRef = useRef();
  const id = useId();
  const [isValid, setIsValid] = useState(true);

  const getDisabledInputStyles = (n) => {
    if (n == 0) {
      return "bg-gray-200 text-gray-700 border rounded-md w-10 px-2 py-1 ml-2";
    }
    return "border rounded-md w-10 px-2 py-1 ml-2";
  };

  const { easyTotal, mediumTotal, hardTotal } = getTotal(data);
  const [maxCount, setMaxCount] = useState({
    easyCount: 0,
    mediumCount: 0,
    hardCount: 0,
  });
  const [warn, setWarn] = useState(false);

  let result = getResult(data, id);

  const fetchMaxCount = async () => {
    let ModuleId = data?.ModuleID;
    ModuleId = ModuleId == 0 || ModuleId == -1 ? null : ModuleId;
    let TopicId = data?.TopicID;
    TopicId = TopicId == 0 || TopicId == -1 ? null : TopicId;
    let SubTopicId = data?.SubTopicID;
    SubTopicId = SubTopicId == 0 || SubTopicId == -1 ? null : SubTopicId;

    const reqData = {
      TechnologyId: technologyId,
      ModuleId,
      TopicId,
      SubTopicId,
    };
    const res = await axios.post(
      "https://www.nareshit.net/FetchAvailableQuestionsByCount",
      reqData
    );

    setMaxCount({
      easyCount: res?.data?.dbresult[0]?.EasyCount || 0,
      mediumCount: res?.data?.dbresult[0]?.MediumCount || 0,
      hardCount: res?.data?.dbresult[0]?.HardCount || 0,
    });
  };

  // Easy Cal
  const [correctEasy, setCorrectEasy] = useState(0);
  useEffect(() => {
    const maxEasyCount = maxCount?.easyCount || 0;
    const availableEasyTotal = easyTotal == 0 ? 0 : queryEasy - easyTotal;
    if (maxEasyCount == 0) setCorrectEasy(0);
    else {
      setCorrectEasy(
        maxEasyCount > availableEasyTotal ? queryEasy - easyTotal : maxEasyCount
      );
    }
  }, [maxCount]);

  // Medium Cal
  const [correctMedium, setCorrectMedium] = useState(0);
  useEffect(() => {
    {
      const maxMediumCount = maxCount?.mediumCount || 0;
      const availableMediumTotal =
        mediumTotal == 0 ? 0 : queryMedium - mediumTotal;
      if (maxMediumCount == 0) {
        setCorrectMedium(0);
      } else {
        setCorrectMedium(
          maxMediumCount > availableMediumTotal
            ? queryMedium - mediumTotal
            : availableMediumTotal
        );
      }
    }
  }, [maxCount]);

  // Hard Cal
  const [correctHard, setCurrentHard] = useState(0);
  useEffect(() => {
    const maxHardCount = maxCount?.hardCount || 0;
    const availableHardTotal = hardTotal == 0 ? 0 : queryHard - hardTotal;
    if (maxHardCount == 0) {
      setCurrentHard(0);
    } else {
      setCurrentHard(
        maxHardCount > availableHardTotal
          ? queryHard - hardTotal
          : availableHardTotal
      );
    }
  }, [maxCount]);

  useEffect(() => {
    fetchMaxCount();
  }, []);

  async function submiteHandler() {
    let go = 0;
    // if we are creating new Combination

    if (
      Number(easyRef.current.value) > 0 ||
      Number(mediumRef.current.value) > 0 ||
      Number(hardRef.current.value) > 0
    ) {
      if (
        Number(easyRef.current.value) <= correctEasy &&
        Number(mediumRef.current.value) <= correctMedium &&
        Number(hardRef.current.value) <= correctHard
      ) {
        setWarn(false);
        if (easyTotal + Number(easyRef.current.value) <= queryEasy)
          // if every thing is okey.
          go++;
        if (mediumTotal + Number(mediumRef.current.value) <= queryMedium) go++;
        if (hardTotal + Number(hardRef.current.value) <= queryHard) go++;
        if (go > 2) {
          result.easy = Number(easyRef.current.value);
          result.medium = Number(mediumRef.current.value);
          result.hard = Number(hardRef.current.value);

          if (data.DataObj) {
            const res = await axios.post(
              "https://www.nareshit.net/InsertionQuestionView",
              {
                TechnologyId: technologyId,
                TechnologyName: technologyName,
                ModuleName: data.DataObj?.Module?.ModuleName,
                ModuleId: data.ModuleID,
                TopicName: data.DataObj?.Topic?.TopicName,
                TopicId: data.TopicID,
                SubtopicName: data.DataObj?.SubTopic?.SubTopicName,
                SubtopicId: data.SubTopicID,
                MediumCount: mediumRef.current.value,
                HardCount: hardRef.current.value,
                EasyCount: easyRef.current.value,
                TestId: TestID,
                TestDetailsId: TestDetailsID,
                Combinations: JSON.stringify(data?.combination),
              }
            );

            console.log(
              "url",
              "https://www.nareshit.net/InsertionQuestionView",
              "data",
              {
                TechnologyId: technologyId,
                TechnologyName: technologyName,
                ModuleName: data.DataObj?.Module?.ModuleName,
                ModuleId: data.ModuleID,
                TopicName: data.DataObj?.Topic?.TopicName,
                TopicId: data.TopicID,
                SubtopicName: data.DataObj?.SubTopic?.SubTopicName,
                SubtopicId: data.SubTopicID,
                MediumCount: mediumRef.current.value,
                HardCount: hardRef.current.value,
                EasyCount: easyRef.current.value,
                TestId: TestID,
                TestDetailsId: TestDetailsID,
                Combinations: JSON.stringify(data?.combination),
              },
              "res",
              res
            );
          }

          handler(result, "edit");
          setter(false);
          setIsValid(true);
        }
      }
    }
    if (
      easyTotal < Number(easyRef?.current?.value) ||
      mediumTotal < Number(mediumRef?.current?.value) ||
      hardTotal < Number(hardRef?.current?.value)
    ) {
      setWarn(true);
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
          <div className="flex content-center">
            <label className="flex items-center" htmlFor="topiceasy">
              Easy:
              <input
                ref={easyRef}
                id="topiceasy"
                type="number"
                disabled={(correctEasy || 0) == 0}
                className={getDisabledInputStyles(correctEasy || 0)}
                defaultValue={result.easy}
              />
            </label>
            <p className="grid grid-flow-col place-content-center">
              <span className="font-bold mx-2">/</span>
              <span className="text-base text-yellow-600 content-ceter">
                {correctEasy}
              </span>
            </p>
          </div>
          <div className="flex content-center">
            <label className="flex items-center" htmlFor="topicmedium">
              Medium:
              <input
                ref={mediumRef}
                id="topicmedium"
                type="number"
                disabled={(correctMedium || 0) == 0}
                className={getDisabledInputStyles(correctMedium || 0)}
                defaultValue={result.medium}
              />
            </label>
            <p className="grid grid-flow-col place-content-center">
              <span className="font-bold mx-2">/</span>
              <span className="text-base text-yellow-600 content-ceter">
                {correctMedium}
              </span>
            </p>
          </div>
          <div className="flex content-center">
            <label className="flex items-center" htmlFor="topichard">
              Hard:
              <input
                ref={hardRef}
                id="topichard"
                type="number"
                disabled={(correctHard || 0) == 0}
                className={getDisabledInputStyles(correctHard || 0)}
                defaultValue={result.hard}
              />
            </label>
            <p className="grid grid-flow-col place-content-center">
              <span className="font-bold mx-2">/</span>
              <span className="text-base text-yellow-600 content-ceter">
                {correctHard}
              </span>
            </p>
          </div>
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

export default QuestionViewEditModal;
