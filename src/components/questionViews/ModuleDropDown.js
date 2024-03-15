import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchModuleList, userSelectionAction } from "../../store/root.actions";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

function ModuleDropDown() {
  const dispatch = useDispatch();
  const userSelection = useSelector((store) => store.userSelectionReducer);
  const modulelist = useSelector((store) => store.modulesListReducer);

  const [modules, setModules] = useState([]);
  const [selectedModule, setSelectedModule] = useState("");

  useEffect(() => {
    if (userSelection.technology && userSelection.technology.TechnologyID)
      dispatch(fetchModuleList(userSelection.technology.TechnologyID));
    else console.warn("trying to fetch modules without technologyId");
  }, [userSelection.technology?.TechnologyID]);

  useEffect(() => {
    if (modulelist.data.length > 0) {
      setModules(modulelist.data);
    }
  }, [modulelist]);

  useEffect(() => {
    if (modules.length > 0) {
      const selectedModuleData = modules.find(
        (ele) => ele.ModuleID === selectedModule
      );
      dispatch(userSelectionAction.setModule(selectedModuleData));

      if (!selectedModuleData) console.warn("Cannot find module with moduleId");
    }
  }, [selectedModule]);

  const onSelectionChange = (e) => {
    setSelectedModule(e.target.value);
  };

  return (
    <div className="min-w-[18rem] max-w-[18rem]">
      <FormControl fullWidth>
        <InputLabel id="demo-select-small-label">Select A Module</InputLabel>
        <Select
          labelId="demo-select-small-label"
          id="demo-select-small"
          label="Select A Module"
          value={selectedModule}
          onChange={onSelectionChange}
        >
          {modules.map((module) => (
            <MenuItem key={module.ModuleID} value={module.ModuleID}>
              {module.ModuleName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

export default ModuleDropDown;
