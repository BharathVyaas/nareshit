import axios from "axios";
import React, { forwardRef, useEffect, useState } from "react";
import { LocalStorage } from "../../services/LocalStorage";

function getCurrentValue(id, arr) {
  if (!(id || arr)) {
    throw new Error("must pass valid data to getCurrentValue");
  }

  if (typeof arr !== "object") {
    throw new Error("must pass array as second paraem");
  }

  const currentArr = arr.find((ele) => ele.TechnologyID == Number(id));

  return currentArr.TechnologyID;
}

function getCurrentTechnology(id, arr) {
  if (!(id || arr)) {
    throw new Error("must pass valid data to getCurrentTechnology");
  }

  if (typeof arr !== "object") {
    throw new Error("must pass array as second paraem");
  }

  const currentArr = arr.find((ele) => ele.TechnologyID == Number(id));

  return currentArr;
}

function SelectedTechnology({ technologyID, setTechnologyID }) {
  const [programmingLanguages, setProgrammingLanguages] = useState();

  // store current value to display
  const [selectedValue, setSelectedValue] = useState("Select A Technology");

  useEffect(() => {
    if (LocalStorage.technologyPage && typeof programmingLanguages === "object")
      setSelectedValue(
        getCurrentValue(
          LocalStorage.technologyPage.technologyID,
          programmingLanguages
        )
      );
  }, [programmingLanguages]);

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

      // LocalStorage.currentTechnology holds selected technology data
      LocalStorage.currentTechnology = getCurrentTechnology(
        e.target.value,
        programmingLanguages
      );
    }
  };

  return (
    <div className="flex flex-col mx-4">
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
