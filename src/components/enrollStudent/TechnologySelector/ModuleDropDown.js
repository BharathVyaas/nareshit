import { useEffect, useState } from "react";
import axios from "axios";
import { FormControl, InputLabel } from "@mui/material";
import SelectMenu from "../../../ui/EnrollStudent/Select";

const fetchHandler = async (setter, id) => {
  const res = await axios.get(`https://www.nareshit.net/fetchModules/${id}`);

  setter([
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

  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (technologyData.technologyId)
      fetchHandler(setOptions, technologyData.technologyId);
    else {
      setOptions([]);
      setModuleId("0");
    }
  }, [technologyData.technologyId]);

  useEffect(() => {
    // updates technologyData in TechnologySelector.js
    dispatcher({ type: "moduleId", payload: Number(moduleId) });
  }, [moduleId]);

  return (
    <div className="w-1/3">
      <FormControl sx={{ minWidth: 300 }}>
        <InputLabel id="demo-simple-select-label">Module</InputLabel>
        <SelectMenu
          defaultValue={moduleId}
          setter={setModuleId}
          options={options}
          label={"Module"}
        />
      </FormControl>
    </div>
  );
}

<<<<<<< HEAD
export default ModuleDropDown;
=======
<<<<<<< HEAD
export default ModuleDropDown;
=======
export default ModuleDropDown;
>>>>>>> a30fca1893a425daee4853497f0f827b3ceead45
>>>>>>> origin/master
