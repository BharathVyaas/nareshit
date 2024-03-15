import { useDispatch, useSelector } from "react-redux";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { userSelectionAction } from "../../store/root.actions";
import { useEffect, useState } from "react";

function TechnologyDropDown() {
  const dispatch = useDispatch();
  const technologyList = useSelector((store) => store.technologiesListReducer);
  const userSelection = useSelector((store) => store.userSelectionReducer);
  const technologyPageDetails = useSelector(
    (store) => store.technologyPageReducer
  );
  const [selectedTechnology, setSelectedTechnology] = useState("0");

  const onSelectionChange = (e) => {
    setSelectedTechnology(e.target.value);
  };

  useEffect(() => {
    setSelectedTechnology(technologyPageDetails.data?.TechnologyID);
  }, [technologyPageDetails.data?.TechnologyID]);

  useEffect(() => {
    if (Array.isArray(technologyList.data)) {
      const selectedTechnologyDetails = technologyList.data.find(
        (technology) => technology.TechnologyID === selectedTechnology
      );

      if (selectedTechnology !== "0")
        dispatch(userSelectionAction.setTechnology(selectedTechnologyDetails));
      else dispatch(dispatch(userSelectionAction.setTechnology()));
    }
  }, [selectedTechnology]);

  return (
    <FormControl variant="standard" fullWidth>
      <InputLabel id="demo-simple-select-label">Select A Technology</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        label="Select A Technology"
        value={userSelection.technology?.TechnologyID || "0"}
        onChange={onSelectionChange}
      >
        {Array.isArray(technologyList.data) &&
          technologyList.data.map((technology) => (
            <MenuItem
              key={technology.TechnologyID}
              value={technology.TechnologyID}
            >
              {technology.TechnologyName}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );
}

export default TechnologyDropDown;
