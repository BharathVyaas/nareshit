import { useEffect, useState } from "react";
import axios from "axios";
import { FormControl, FormHelperText, InputLabel } from "@mui/material";
import SelectMenu from "../../../ui/EnrollStudent/Select";
import { useDispatch, useSelector } from "react-redux";
import { setModule } from "../../../store/slice/enrollStudent.slice";

const fetchModules = async (technologyId) => {
  try {
    const response = await axios.get(
      `https://www.nareshit.net/fetchModules/${technologyId}`
    );
    return response.data.map((module) => ({
      id: module.ModuleID,
      value: module.ModuleID,
      option: module.ModuleName,
    }));
  } catch (error) {
    console.error("Error fetching modules:", error);
    return [];
  }
};

function ModuleDropDown({ isNotSelected }) {
  const dispatch = useDispatch();
  const [moduleId, setModuleId] = useState("0");
  const [options, setOptions] = useState([]);
  const { technology: technologyId } = useSelector(
    (store) => store.enrollStudentReducer
  );

  useEffect(() => {
    const fetchModulesData = async () => {
      if (technologyId) {
        const modules = await fetchModules(technologyId);
        setOptions(modules);
        setModuleId("0");
      } else {
        setOptions([]);
        setModuleId("0");
      }
    };

    fetchModulesData();
  }, [technologyId]);

  const handleModuleChange = (selectedModule) => {
    dispatch(setModule(selectedModule));
    setModuleId(selectedModule);
  };

  return (
    <div className="w-1/3">
      <FormControl sx={{ minWidth: 300 }} error={isNotSelected.module}>
        <InputLabel id="demo-simple-select-label">Module</InputLabel>
        <SelectMenu
          defaultValue={moduleId}
          setter={setModuleId}
          options={options}
          label={"Module"}
          changeHandler={handleModuleChange}
        />
        {isNotSelected.module && (
          <FormHelperText>Must Select A Module</FormHelperText>
        )}
      </FormControl>
    </div>
  );
}

export default ModuleDropDown;
