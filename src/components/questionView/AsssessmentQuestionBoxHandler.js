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
          handler={handler}
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
                  key={element.id + index}
                  index={index}
                  element={element}
                  handler={handler}
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
        <th className="px-5 border-x-2 border-black" key={id}>
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
  setPopup,
  handler,
  element,
  index,
  setStale,
  nextButtonHandler,
}) {
  const { testName, isActive, startDate, endDate, startTime, endTime } =
    element;

  const styles =
    index % 2 === 0
      ? "bg-gray-100 hover:bg-gray-200"
      : "bg-white  hover:bg-gray-300";

  return (
    <tr
      onClick={() =>
        handler({ element, subTopicId: LocalStorage.subTopicData.subTopicId })
      }
      key={element.id}
      className={styles}
    >
      <Tbody
        nextButtonHandler={nextButtonHandler}
        setPopup={setPopup}
        data={testName}
        id={element.id}
        setStale={setStale}
        type="moduleName"
        element={element}
      />
      <Tbody
        nextButtonHandler={nextButtonHandler}
        setPopup={setPopup}
        data={isActive}
        id={element.id}
        setStale={setStale}
        type="topicName"
        element={element}
      />
      <Tbody
        nextButtonHandler={nextButtonHandler}
        setPopup={setPopup}
        data={startDate}
        id={element.id}
        setStale={setStale}
        type="subTopicName"
        element={element}
      />
      <Tbody
        nextButtonHandler={nextButtonHandler}
        setPopup={setPopup}
        data={endDate}
        tag="input"
        type="easy"
        id={element.id + " easy"}
        setStale={setStale}
        element={element}
      />
      <Tbody
        nextButtonHandler={nextButtonHandler}
        setPopup={setPopup}
        data={startTime}
        tag="input"
        type="medium"
        id={element.id + " medium"}
        setStale={setStale}
        element={element}
      />
      <Tbody
        nextButtonHandler={nextButtonHandler}
        setPopup={setPopup}
        data={endTime}
        tag="input"
        type="hard"
        id={element.id + " hard"}
        setStale={setStale}
        element={element}
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
  data,
  tag,
  id,
  setPopup,
  setStale,
  type,
  element,
  nextButtonHandler,
  ...props
}) {
  /* console.log(data, tag, id, setPopup, setStale); */
  const { data: dataCtx, setData: setDataCtx } = useContext(QuestionView);

  let content = (
    <td className="md:px-5 text-center py-1 border-[1.2px]" {...props}>
      {data}
    </td>
  );

  const [value, setValue] = useState(data);

  function handler(_data, flag, setter, _total, id, siblings) {
    setStale((prev) => true);
    let data = Number(_data);
    let evaluate;

    if (id.includes("easy")) evaluate = "easy";
    if (id.includes("medium")) evaluate = "medium";
    if (id.includes("hard")) evaluate = "hard";

    if (!evaluate)
      throw new Error("AssessmentQuestionBoxHandler:Tbody:handler");

    const max_value = _total.assessmentData.MCQ.difficulty[evaluate];
    let current_value = 0;
    const siblings_eval_array = [];
    let siblings_evaluate = 0;

    siblings.forEach((element) => siblings_eval_array.push(element[evaluate]));

    siblings_evaluate = siblings_eval_array.reduce((e, a) => e + a, 0);

    let sibData = siblings_evaluate;
    sibData += flag ? 1 : -1;

    if (sibData > max_value) {
      return;
    } else {
      let localStorageData = LocalStorage.questionView;
      localStorageData = localStorageData.map((element) => {
        if (element.id + " " + evaluate === id) {
          current_value = element[evaluate];
          element[evaluate] = _data;
        }
        return element;
      });

      LocalStorage.questionView = localStorageData;
      //

      setDataCtx(LocalStorage.questionView);

      setValue(_data);
      nextButtonHandler(evaluate, _data);
    }
  }

  function windowPopupHandler(data) {
    const _id =
      data.type +
      data?.element?.element?.selectedModule?.moduleName +
      data?.element?.element?.selectedTopic?.topicName +
      data?.element?.element?.selectedSubTopic?.subTopicName;

    if (
      (LocalStorage.questionViewFixedModal[_id]?.length || 0) + 1 >
      data.value
    )
      window.alert(
        `Must remove ${Math.abs(
          (LocalStorage.questionViewFixedModal[_id]?.length || 0) +
            1 -
            data.value
        )} questions from ${data.type}`
      );
  }

  const underline =
    BuilderService.technologyService._technology.natureOfAssessment === "fixed"
      ? "bg-transparent underline underline-offset-2 decoration-2 decoration-red-500 "
      : "bg-transparent";

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
              setStale((prev) => !prev);
              handler(
                data + 1,
                true,
                setValue,
                LocalStorage.data,
                id,
                LocalStorage.questionView
              );
            }}
          >
            +
          </button>

          <button
            onClick={() => {
              if (
                BuilderService.technologyService._technology
                  .natureOfAssessment === "fixed"
              )
                setPopup({ value, type, element });
            }}
            className={underline}
          >
            {value}
          </button>

          <button
            className="grid place-content-center w-6 mx-1 rounded bg-slate-700 text-white"
            onClick={(e) => {
              if (data - 1 >= 0) {
                setStale((prev) => !prev);
                handler(
                  data - 1,
                  false,
                  setValue,
                  LocalStorage.data,
                  id,
                  LocalStorage.questionView
                );
                windowPopupHandler({ value, type, element });
              }
            }}
          >
            -
          </button>
        </div>
      </td>
    );
  return content;
}
