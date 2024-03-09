import { useEffect, useState } from "react";
import axios from "axios";
import Select from "../../../ui/EnrollStudent/Select";

const fetchHandler = async (setter, id) => {
  const res = await axios.get(`https://www.nareshit.net/fetchModules/${id}`);

  setter([
    { key: "0", value: "0", option: "Select A Module" },
    ...res.data.map((ele) => {
      return {
        id: ele.ModuleID,
        value: ele.ModuleID,
        option: ele.ModuleName,
      };
    }),
  ]);
};

function ModuleDropDown({ technologyData, dispatcher }) {
  const [moduleId, setModuleId] = useState("0");

  const [options, setOptions] = useState([
    { key: "0", value: "0", option: "Select A Module" },
  ]);

  useEffect(() => {
    if (technologyData.technologyId)
      fetchHandler(setOptions, technologyData.technologyId);
    else{
      setOptions([{id: '0', value: '0', option: 'Select A Module'}])
      setModuleId('0')
    }
  }, [technologyData.technologyId]);

  useEffect(() => {
    // updates technologyData in TechnologySelector.js
    dispatcher({ type: "moduleId", payload: Number(moduleId) });
  }, [moduleId]);

  return (
    <div className="px-3 py-2 inline">
    <Select defaultValue={moduleId} setter={setModuleId} options={options} /></div>
  );
}

export default ModuleDropDown;
