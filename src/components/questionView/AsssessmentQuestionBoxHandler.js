import React, { useContext } from "react";
import AssessmentQuestionBox from "../AssessmentQuestionbox";
import BuilderService from "../../services/builder";
import TopicsContext from "../../context/topicsContext";
import QuestionViewTopic from "./QuestionViewTopic";
import { TableBodyRenderer, TableHead } from "../../ui/table/TableUI";
import { LocalStorage } from "../../services/LocalStorage";

const Titles = ["MCQ", "MCQ"];

function AsssessmentQuestionBoxHandler({
  stale,
  setStale,
  questionView,
  setQuestionView,
  selectTechnology,
}) {
  const MCQDifficulty = BuilderService.getDifficultyByTitle(Titles[0]);

  if (
    JSON.stringify(questionView) !== JSON.stringify(LocalStorage.questionView)
  ) {
    console.log("das");
    LocalStorage.questionView = [...LocalStorage.questionView, ...questionView];
  }

  console.log(LocalStorage.questionView);

  /******
   * Constent
   *
   *
   *
   */

  const easyArr = [];
  const mediumArr = [];
  const hardArr = [];

  LocalStorage.questionView.forEach((item) => {
    easyArr.push(item.easy);
    mediumArr.push(item.medium);
    hardArr.push(item.hard);
  });

  const easy = easyArr.reduce((element, acc) => element + acc, 0);
  const medium = mediumArr.reduce((element, acc) => element + acc, 0);
  const hard = hardArr.reduce((element, acc) => element + acc, 0);

  const TableAttributeTitles = [
    { title: "Module Name", id: 1 },
    { title: "Topic Name", id: 2 },
    { title: "Sub Topic Name", id: 3 },
    { title: `Easy: ${easy}00 / 90`, id: 4 },
    { title: `Medium: ${medium}00 / 90`, id: 5 },
    { title: `Hard:  ${hard}00 / 90`, id: 6 },
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

  console.log("tableBody", tableBody);

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
