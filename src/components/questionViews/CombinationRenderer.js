import React from "react";
import {
  TableBodyRenderer,
  TableHead,
} from "../questionView/AsssessmentQuestionBoxHandler";
import { useLocation } from "react-router";

function getTableAttributeTitles(
  combination,
  queryEasy,
  queryMedium,
  queryHard
) {
  const combinationValues = Object.values(combination);

  let currentEasy = combinationValues.reduce(
    (acc, ele) => Number(ele.easy) + acc,
    0
  );
  let currentMedium = combinationValues.reduce(
    (acc, ele) => Number(ele.medium) + acc,
    0
  );
  let currentHard = combinationValues.reduce(
    (acc, ele) => Number(ele.hard) + acc,
    0
  );

  const TableAttributeTitles = [
    { title: "Module Name", id: "sds" },
    { title: "Topic Name", id: "wer" },
    { title: "Sub Topic Name", id: "wes" },
    { title: `Easy: ${currentEasy}/${queryEasy}`, id: "fgh" },
    { title: `Medium: ${currentMedium}/${queryMedium}`, id: "ntr" },
    { title: `Hard:  ${currentHard}/${queryHard}`, id: "zcd" },
  ];

  return TableAttributeTitles;
}

function CombinationRenderer({
  combination,
  setCombination,
  setViewModal,
  setEditModal,
  natureID,
}) {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const queryEasy = queryParams.get("easy") || 0;
  const queryMedium = queryParams.get("medium") || 0;
  const queryHard = queryParams.get("hard") || 0;

  return (
    <div className="p-5">
      <p className="text-lg font-semibold mb-4">
        Please select an <span className="bg-red-100">underlined value</span> to
        fetch questions:
      </p>
      <div className="">
        <table className="w-full overflow-clip">
          <thead>
            <TableHead
              titles={getTableAttributeTitles(
                combination,
                queryEasy,
                queryMedium,
                queryHard
              )}
            />
          </thead>
          <tbody>
            {combination &&
              Object.values(combination).map((element) => (
                <TableBodyRenderer
                  natureID={natureID}
                  combination={combination}
                  setCombination={setCombination}
                  setViewModal={setViewModal}
                  setEditModal={setEditModal}
                  key={element.id}
                  element={element}
                />
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CombinationRenderer;
