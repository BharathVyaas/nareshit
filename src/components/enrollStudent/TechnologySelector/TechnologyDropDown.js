import { useEffect, useState } from "react";
import Select from "../../../ui/EnrollStudent/Select";
import axios from "axios";

const fetchHandler = async (setter) => {
  const res = await axios.get("https://www.nareshit.net/fetchTechnologies");

  setter([
    { key: "0", value: "0", option: "Select A Technology" },
    ,
    ...res.data.map((ele) => {
      return {
        id: ele.TechnologyID,
        value: ele.TechnologyID,
        option: ele.TechnologyName,
      };
    }),
  ]);
};

function TechnologyDropDown({ dispatcher }) {
  const [technologyId, setTechnologyId] = useState("0");

  const [options, setOptions] = useState([
    { key: "0", value: "0", option: "Select A Technology" },
  ]);

  useEffect(() => {
    fetchHandler(setOptions);
  }, []);

  useEffect(() => {
    // updates technologyData in TechnologySelector.js
    dispatcher({ type: "technologyId", payload: Number(technologyId) });
  }, [technologyId]);

  return (
    <Select
      defaultValue={technologyId}
      setter={setTechnologyId}
      options={options}
    />
  );
}

export default TechnologyDropDown;
