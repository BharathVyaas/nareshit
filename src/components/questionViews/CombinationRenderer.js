import React from "react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import {
  TableBodyRenderer,
  TableHead,
} from "../questionView/AsssessmentQuestionBoxHandler";

const TableAttributeTitles = [
  { title: "Module Name", id: "sds" },
  { title: "Topic Name", id: "wer" },
  { title: "Sub Topic Name", id: "wes" },
  { title: `Easy: `, id: "fgh" },
  { title: `Medium: `, id: "ntr" },
  { title: `Hard:  `, id: "zcd" },
];

function CombinationRenderer({ combination, setCombination, setPopup }) {
  return (
    <div>
      <p>
        Please select an <span className="bg-red-100">underlined value</span> to
        fetch questions:
      </p>
      <div className="">
        <table className="w-full overflow-clip">
          <thead>
            <TableHead titles={TableAttributeTitles} />
          </thead>
          <tbody>
            {combination &&
              Object.values(combination).map((element, index) => (
                <TableBodyRenderer
                  combination={combination}
                  setCombination={setCombination}
                  setPopup={setPopup}
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
