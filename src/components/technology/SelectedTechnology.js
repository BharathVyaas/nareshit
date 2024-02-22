import axios from "axios";
import React, { forwardRef, useEffect, useState } from "react";
import { useLocation } from "react-router";

function getCurrentValue(id, arr) {
  if (!(id || arr)) {
    throw new Error("must pass valid data to getCurrentValue");
  }

  if (typeof arr !== "object") {
    throw new Error("must pass array as second paraem");
  }

  const currentArr = arr.find((ele) => ele?.TechnologyID == Number(id));

  return currentArr?.TechnologyID;
}

function getCurrentTechnology(id, arr) {
  if (!(id || arr)) {
    throw new Error("must pass valid data to getCurrentTechnology");
  }

  if (typeof arr !== "object") {
    throw new Error("must pass array as second paraem");
  }

  const currentArr = arr.find((ele) => ele?.TechnologyID == Number(id));

  return currentArr;
}

function SelectedTechnology({ technologyID, setTechnologyID }) {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const technologyId = queryParams.get("technologyId");

  const [programmingLanguages, setProgrammingLanguages] = useState();

  // store current value to display
  const [selectedValue, setSelectedValue] = useState(String(technologyId));

  // fetch data
  useEffect(() => {
    async function fetchHandler() {
      const res = await axios.get("https://www.nareshit.net/fetchTechnologies");

      setProgrammingLanguages(res.data);
    }

    fetchHandler();
  }, []);

  // on selected value change
  const changeHandler = (e) => {
    setTechnologyID(e.target.value);

    if (typeof programmingLanguages === "object") {
      setSelectedValue(getCurrentValue(e.target.value, programmingLanguages));
    }
  };

  return (
    <div className="flex flex-col mx-4">
      {/** Technology Name from ID */}
      <input
        className="hidden"
        value={String(
          programmingLanguages?.find((ele) => ele.TechnologyID == selectedValue)
            ?.TechnologyName
        )}
        onChange={() => {}}
        name="TechnologyName"
      />

      <label>Select Technology</label>
      <select
        id="proglang"
        name="TechnologyID"
        className="mx-6 w-[200px]"
        value={selectedValue}
        onChange={changeHandler}
      >
        {/** default */}
        <option value="-1">Select A Technology</option>

        {programmingLanguages &&
          programmingLanguages.map(({ TechnologyID, TechnologyName }) => (
            <option key={TechnologyID} value={TechnologyID}>
              {TechnologyName}
            </option>
          ))}
      </select>
    </div>
  );
}

export default SelectedTechnology;
