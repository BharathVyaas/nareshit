import React, { useContext, useEffect, useMemo, useState } from "react";
import AssessmentQuestionBox from "../AssessmentQuestionbox";
import BuilderService from "../../services/builder";
import TopicsContext from "../../context/topicsContext";
import QuestionViewTopic from "./QuestionViewTopic";
import { LocalStorage } from "../../services/LocalStorage";
import QuestionView from "../../context/questionView";
import axios from "axios";
import Modal from "../../ui/Modal";
import QuestionViewFixedModal from "../../ui/QuestionViewFixedModal.js";
import TableTotalCtx from "../../context/tableTotalCtx.js";
import { useLocation } from "react-router";

const Titles = ["MCQ", "MCQ"];

function AsssessmentQuestionBoxHandler({
  stale: parentStale,
  setStale: parentSetStale,
  questionView,
  setQuestionView,
  selectTechnology,
  data: questionData,
  setData: setQuestionData,
  nextButtonHandler,
  setTotal,
  isValid,
  setIsValid,
}) {
  const [stale, setStale] = useState(parentStale);

  const { data } = useContext(QuestionView);

  useEffect(() => {
    setStale(parentStale);
  }, [parentStale]);

  const MCQDifficulty = BuilderService.getDifficultyByTitle(Titles[0]);

  if (
    JSON.stringify(questionView) !== JSON.stringify(LocalStorage.questionView)
  ) {
    const newData = questionView.filter((item) => {
      const isNewItem = !LocalStorage.questionView.some(
        (existingItem) => existingItem.id === item.id
      );

      if (!isNewItem) {
      }

      return isNewItem;
    });

    LocalStorage.questionView = [...LocalStorage.questionView, ...newData];
  }

  /******
   * Constent
   *
   *
   *
   */

  let easyTotalSibling = 0;
  let mediumTotalSibling = 0;
  let hardTotalSibling = 0;

  LocalStorage?.questionView.forEach(
    (element) => (easyTotalSibling += element.easy)
  );

  LocalStorage?.questionView.forEach(
    (element) => (mediumTotalSibling += element.medium)
  );

  LocalStorage?.questionView.forEach(
    (element) => (hardTotalSibling += element.hard)
  );

  const easy = useMemo(() => easyTotalSibling, [easyTotalSibling]);
  const medium = useMemo(() => mediumTotalSibling, [mediumTotalSibling]);
  const hard = useMemo(() => hardTotalSibling, [hardTotalSibling]);

  useEffect(() => {
    if (
      !isValid &&
      easy + medium + hard >=
        BuilderService.assessmentService.options.MCQ.totalQuestions
    ) {
      setIsValid(true);
    } else if (
      isValid &&
      !(
        easy + medium + hard >=
        BuilderService.assessmentService.options.MCQ.totalQuestions
      )
    ) {
      setIsValid(false);
    }
  }, [easy, medium, hard]);

  const TableAttributeTitles = [
    { title: "Module Name", id: "sds" },
    { title: "Topic Name", id: "wer" },
    { title: "Sub Topic Name", id: "wes" },
    { title: `Easy: ${easy} / ${MCQDifficulty.easy}`, id: "fgh" },
    { title: `Medium: ${medium} / ${MCQDifficulty.medium}`, id: "ntr" },
    { title: `Hard:  ${hard} / ${MCQDifficulty.hard}`, id: "zcd" },
  ];

  /*******
   *
   */

  const tableBody = LocalStorage.questionView.map((element) => {
    return {
      testName: element?.selectedModule?.moduleName,
      isActive: element?.selectedTopic?.topicName,
      startDate: element?.selectedSubTopic?.subTopicName,
      endDate: element?.easy,
      startTime: element?.medium,
      endTime: element?.hard,
      id: element?.id,
      element: element,
    };
  });

  const [popup, setPopup] = useState(false);
  /*const { setTotal } = useContext(TableTotalCtx); */

  /*  useEffect(() => {
    let easy = 0;
    let medium = 0;
    let hard = 0;

    tableBody.forEach((element) => {
      easy += element.endDate;
      medium += element.startTime;
      hard += element.endTime;
      console.log(element);
    });

     setTotal({ easy, medium, hard });
  }, [tableBody]); */

  async function handler(data) {
    /*  // Ensure data properties are properly formatted
    const endDate = data.element.endDate;
    const startTime = data.element.startTime;
    const endTime = data.element.endTime;
    const subTopicId = data.subTopicId;

    // Construct the URL with validated parameters
    const url = `https://www.nareshit.net/fetchDynamicQuestions?Hardcount=${endDate}&MediumCount=${startTime}&EasyCount=${endTime}&SubTopicID=${subTopicId}`;

    try {
      // Fetch data from the constructed URL
      const res = await axios.get(url);
      setQuestionData(res.data);
      console.log(res);
    } catch (error) {
      console.error("Error fetching dynamic questions:", error);
    } */
  }

  function handler(data) {
    /* console.log("handling", data); */
  }

  return (
    <section className="overflow-auto container">
      {popup && (
        <Modal
          styles={"bg-white rounded-lg shadow-lg w-3/4 md:w-1/2 lg:w-2/3 z-50"}
          data={popup}
          setter={setPopup}
          ModalParam={QuestionViewFixedModal}
        />
      )}
      <AssessmentQuestionBox
        title={Titles[0]}
        setStale={setStale}
        easy={MCQDifficulty.easy}
        medium={MCQDifficulty.medium}
        hard={MCQDifficulty.hard}
        selectTechnology={selectTechnology}
      >
        {/**    Table Start   */}

        <table className="w-full overflow-clip">
          <thead>
            <TableHead titles={TableAttributeTitles} />
          </thead>
          <tbody>
            {LocalStorage.questionView &&
              LocalStorage.questionView[0]?.name &&
              tableBody.map((element, index) => (
                <TableBodyRenderer
                  nextButtonHandler={nextButtonHandler}
                  setPopup={setPopup}
                  key={element.id}
                  element={element}
                  setStale={setStale}
                />
              ))}
          </tbody>
        </table>

        {/**    Table End    */}

        {/* {questionView &&
          questionView[0]?.name &&
          questionView.map((element) => {
            return (
              <QuestionViewTopic
                selectedModule={element.selectedModule}
                selectedSubTopic={element.selectedSubTopic}
                selectedTopic={element.selectedTopic}
                key={element.id}
                title={element.name}
                setStale={setStale}
                easy={element.easy}
                medium={element.medium}
                hard={element.hard}
              />
            );
          })} */}
      </AssessmentQuestionBox>
    </section>
  );
}

export default AsssessmentQuestionBoxHandler;

/**
 * Component for rendering the table head.
 * @param {Object} props - The component props.
 * @param {Array} props.titles - An array of assessment titles.
 * @returns {JSX.Element} The TableHead component.
 */
export function TableHead({ titles }) {
  return (
    <tr className="border-[2px] border-black">
      {titles.map(({ title, id }) => (
        <th className="px-0 border-x-2 border-black" key={id}>
          {title}
        </th>
      ))}
    </tr>
  );
}

/**
 * Component for rendering the table body rows.
 * @param {Object} props - The component props.
 * @param {Object} props.element - An assessment data object.
 * @returns {JSX.Element} The TableBodyRenderer component.
 */

export function TableBodyRenderer({
  setViewModal,
  setEditModal,
  element,
  combination,
  setCombination,
  natureID,
}) {
  const arr = Object.values(element);
  let data;
  if (typeof arr === "object") data = arr[0];

  return (
    <tr key={element.id} className="bg-gray-100 hover:bg-gray-200">
      <Tbody
        natureID={natureID}
        setViewModal={setViewModal}
        setEditModal={setEditModal}
        data={element?.selectedModule}
        type="moduleName"
        element={element}
        combination={combination}
        setCombination={setCombination}
      />
      <Tbody
        natureID={natureID}
        setViewModal={setViewModal}
        setEditModal={setEditModal}
        data={element?.selectedTopic}
        type="topicName"
        element={element}
        combination={combination}
        setCombination={setCombination}
      />
      <Tbody
        natureID={natureID}
        setViewModal={setViewModal}
        setEditModal={setEditModal}
        data={element?.selectedSubTopic}
        type="subTopicName"
        element={element}
        combination={combination}
        setCombination={setCombination}
      />
      <Tbody
        natureID={natureID}
        setViewModal={setViewModal}
        setEditModal={setEditModal}
        tag="input"
        type="easy"
        element={element}
        combination={combination}
        setCombination={setCombination}
      />
      <Tbody
        natureID={natureID}
        setViewModal={setViewModal}
        setEditModal={setEditModal}
        tag="input"
        type="medium"
        element={element}
        combination={combination}
        setCombination={setCombination}
      />
      <Tbody
        natureID={natureID}
        setViewModal={setViewModal}
        setEditModal={setEditModal}
        tag="input"
        type="hard"
        element={element}
        combination={combination}
        setCombination={setCombination}
      />
    </tr>
  );
}

/**
 * Component for rendering table body cells.
 * @param {Object} props - The component props.
 * @param {string} props.data - The data to be displayed in the cell.
 * @returns {JSX.Element} The Tbody component.
 */
/**
 * Component for rendering table body cells.
 * @param {Object} props - The component props.
 * @param {string} props.data - The data to be displayed in the cell.
 * @returns {JSX.Element} The Tbody component.
 */
export function Tbody({
  setViewModal,
  setEditModal,
  data,
  tag,
  type,
  element,
  combination,
  setCombination,
  natureID,
  ...props
}) {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  let content = (
    <td
      className="md:px-5 text-center py-1 border-[1.2px]"
      {...props}
      onClick={() => {
        /* console.log("edit", {
          modalData: element,
          type,
          element: element,
          combination,
          popupType: "edit",
        }); */
        setEditModal({
          modalData: element,
          type,
          element,
          combination,
          popupType: "edit",
        });
      }}
    >
      {data || element[type] || "None Selected"}
    </td>
  );

  // used to change count
  function handler(present, previous, flag) {
    if ((element?.includes?.[type]?.includes?.length || 0) > present) {
      window.alert("Must remove 1 question before reducing count");
    } else {
      // returns array of combination objects
      const allElements = Object.values(combination);

      // total from asssessment page
      const queryTotal = Number(queryParams.get(type)) || 0;

      // stroes a number
      let total = allElements.reduce((acc, ele) => {
        return Number(ele[type]) + acc;
      }, 0);

      // to get current Data
      total -= previous;
      total += present;

      // if total is less then queryTotal and user doing add
      // ||
      // if present is less then 0 and user trying to do sub
      if ((total <= queryTotal && flag) || (present >= 0 && !flag)) {
        // if user want to decrease count and count is already 0 dont go lower
        if (present >= 0 || flag) {
          setCombination((prev) => {
            const obj = { ...prev };
            obj[element.id][type] = Number(present);

            return obj;
          });
        }
      }
    }
  }

  const underline =
    natureID === 2
      ? "bg-transparent underline underline-offset-2 decoration-2 decoration-red-500"
      : "bg-transparent ";
  if (tag === "input")
    content = (
      <td
        onClick={(e) => e.stopPropagation()}
        className="text-center border-[1.2px]"
        {...props}
      >
        <div className="flex justify-between items-center">
          <button
            className="grid place-content-center w-6 mx-1 rounded bg-slate-700 text-white"
            onClick={(e) => {
              handler(Number(element[type] + 1), Number(element[type]), true);
            }}
          >
            +
          </button>

          <button
            /* className={underline} */
            className={underline}
            onClick={() => {
              if (natureID === 2)
                setViewModal({
                  modalData: element,
                  type,
                  element,
                  combination,
                  popupType: "view",
                  currentTotal: element[type],
                });
            }}
          >
            {element[type]}
          </button>

          <button
            className="grid place-content-center w-6 mx-1 rounded bg-slate-700 text-white"
            onClick={(e) => {
              handler(Number(element[type] - 1), Number(element[type]), false);
            }}
          >
            -
          </button>
        </div>
      </td>
    );
  return content;
}
