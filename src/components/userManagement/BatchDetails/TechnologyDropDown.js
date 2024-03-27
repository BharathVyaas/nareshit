import { useEffect } from "react";
import { connect } from "react-redux";
import { fetchTechnologyList } from "../../../store/root.actions";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { setTechnologyId } from "../../../store/slice/userManagement.slice";

function TechnologyDropDownComponent({
  technologies,
  technologyId,
  isLoading,
  isError,
  dispatchFetch,
  setTechnologyIdDispatch,
}) {
  useEffect(() => {
    dispatchFetch();
  }, []);

  const handleChange = (event) => {
    setTechnologyIdDispatch(event.target.value);
  };

  return isLoading ? (
    <p>Loading...</p>
  ) : isError ? (
    <p>Something went wrong. try refreshing</p>
  ) : (
    <FormControl fullWidth>
      <InputLabel id="technology-DropDown-label">Technology</InputLabel>
      <Select
        labelId="technology-DropDown-label"
        id="technology-DropDown"
        value={isError ? -1 : technologyId}
        label="Technology"
        onChange={handleChange}
      >
        {isError && <MenuItem value={-1}>Some Thing Went Wrong.</MenuItem>}
        {!isError && <MenuItem value={0}>Select A Technology</MenuItem>}
        {technologies &&
          technologies.map((technology) => (
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

const mapTechnologySlice = (state) => ({
  technologies: state.technologiesListReducer.data,
  isLoading: state.technologiesListReducer.isLoading,
  isError: state.technologiesListReducer.isError,
  technologyId: state.userManagementPageReducer.technologyId,
});

const mapDispatch = {
  dispatchFetch: fetchTechnologyList,
  setTechnologyIdDispatch: (item) => setTechnologyId(item),
};

const TechnologyDropDown = connect(
  mapTechnologySlice,
  mapDispatch
)(TechnologyDropDownComponent);

export default TechnologyDropDown;
