import React, { useContext, useEffect, useState } from "react";
import AssessmentQuestionBox from "../AssessmentQuestionbox";
import BuilderService from "../../services/builder";
import TopicsContext from "../../context/topicsContext";
import QuestionViewTopic from "./QuestionViewTopic";
import { LocalStorage } from "../../services/LocalStorage";
import QuestionView from "../../context/questionView";
import axios from "axios";

const Titles = ["MCQ", "MCQ"];

function AsssessmentQuestionBoxHandler({
  stale: parentStale,
  setStale: parentSetStale,
  questionView,
  setQuestionView,
  selectTechnology,
  data: questionData,
  setData: setQuestionData,
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

  const easy = easyTotalSibling;
  const medium = mediumTotalSibling;
  const hard = hardTotalSibling;

  const TableAttributeTitles = [
    { title: "Module Name", id: 1 },
    { title: "Topic Name", id: 2 },
    { title: "Sub Topic Name", id: 3 },
    { title: `Easy: ${easy} / ${MCQDifficulty.easy}`, id: 4 },
    { title: `Medium: ${medium} / ${MCQDifficulty.medium}`, id: 5 },
    { title: `Hard:  ${hard} / ${MCQDifficulty.hard}`, id: 6 },
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
    };
  });

  async function handler(data) {
    console.log(
      data,
      `https://www.nareshit.net/fetchDynamicQuestions/?McqAll=${LocalStorage.exclude.length}&Hardcount=${data.element.endDate}&MediumCount=${data.element.startTime}&EasyCount=${data.endTime}&SubTopicID=${data.element.endTime}&SubTopicID=${data.element.subTopicId}`
    );
    const res = await axios.get(
      `https://www.nareshit.net/fetchDynamicQuestions/?McqAll=${LocalStorage.exclude.length}&Hardcount=${data.element.endDate}&MediumCount=${data.element.startTime}&EasyCount=${data.element.endTime}&SubTopicID=${data.element.subTopicId}`
    );

    setQuestionData(res.data);
    console.log(res);
  }

  return (
    <section className="overflow-auto container">
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
export function TableBodyRenderer({ handler, element, index, setStale }) {
  const { testName, isActive, startDate, endDate, startTime, endTime } =
    element;

  const styles =
    index % 2 === 0
      ? "bg-gray-100 hover:cursor-pointer hover:bg-gray-200"
      : "bg-white hover:cursor-pointer hover:bg-gray-300";

  return (
    <tr
      onClick={() =>
        handler({ element, subTopicId: LocalStorage.subTopicData.subTopicId })
      }
      key={element.id}
      className={styles}
    >
      <Tbody data={testName} id={element.id} setStale={setStale} />
      <Tbody data={isActive} id={element.id} setStale={setStale} />
      <Tbody data={startDate} id={element.id} setStale={setStale} />
      <Tbody
        data={endDate}
        tag="input"
        id={element.id + " easy"}
        setStale={setStale}
      />
      <Tbody
        data={startTime}
        tag="input"
        id={element.id + " medium"}
        setStale={setStale}
      />
      <Tbody
        data={endTime}
        tag="input"
        id={element.id + " hard"}
        setStale={setStale}
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
export function Tbody({ data, tag, id, setStale, ...props }) {
  const { data: dataCtx, setData: setDataCtx } = useContext(QuestionView);

  let content = (
    <td className="md:px-5 text-center py-1 border-[1.2px]" {...props}>
      {data}
    </td>
  );

  const [value, setValue] = useState(data);

  function handler(_data, setter, _total, id, siblings) {
    setStale((prev) => true);
    let data = Number(_data);
    let evaluate;

    if (id.includes("easy")) evaluate = "easy";
    if (id.includes("medium")) evaluate = "medium";
    if (id.includes("hard")) evaluate = "hard";

    if (!evaluate)
      throw new Error("AssessmentQuestionBoxHandler:Tbody:handler");

    const max_value = _total.assessmentData.MCQ.difficulty[evaluate];
    const current_value = 3;
    const siblings_eval_array = [];
    let siblings_evaluate = 0;

    siblings.forEach((element) => siblings_eval_array.push(element[evaluate]));

    siblings_evaluate = siblings_eval_array.reduce((e, a) => e + a, 0);

    if (siblings_evaluate + data > max_value) return;
    else {
      const _in = LocalStorage.questionView.find((element) => {
        return element.id + " " + evaluate === id;
      });

      _in[evaluate] = data;

      const _out = LocalStorage.questionView.filter((element) => {
        return element.id + " " + evaluate !== id;
      });
      LocalStorage.questionView = [_in, ..._out];
      setDataCtx([_in, ..._out]);

      setValue(data);
    }
  }

  if (tag === "input")
    content = (
      <td
        onClick={(e) => e.stopPropagation()}
        className="md:px-5 text-center py-1 border-[1.2px]"
        {...props}
      >
        <input
          type="number"
          className="w-10"
          id={id}
          value={value}
          onChange={(e) => {
            setStale((prev) => !prev);
            handler(
              e.target.value,
              setValue,
              LocalStorage.data,
              id,
              LocalStorage.questionView
            );
          }}
        />
      </td>
    );
  return content;
}
