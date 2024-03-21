import { useEffect, useState } from "react";
import SelectMenu from "../../../ui/EnrollStudent/Select";
import axios from "axios";
import { FormControl, FormHelperText, InputLabel } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { types } from "../../../store/root.actions";

const fetchHandler = async (setter) => {
  try {
    const res = await axios.get("https://www.nareshit.net/fetchTechnologies");

    setter([
      ...res.data.map((ele) => {
        return {
          id: ele.TechnologyID,
          value: ele.TechnologyID,
          option: ele.TechnologyName,
        };
      }),
    ]);
  } catch (err) {
    console.error(err);
  }
};

function TechnologyDropDown({
  dispatcher,
  setSelectedTechnology,
  isNotSelected,
}) {
  //
  const technologyData = useSelector((state) => state.technologiesListReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: `fetch/${types.TECHNOLOGY_LIST}` });
  }, []);

  const [technologyId, setTechnologyId] = useState("0");

  const [options, setOptions] = useState([]);

  const changeHandler = (selectedTechnology) => {
    console.log("selectedTech", selectedTechnology);
    setTechnologyId(selectedTechnology);
  };

  useEffect(() => {
    fetchHandler(setOptions);
  }, []);

  useEffect(() => {
    // updates technologyData in TechnologySelector.js
    dispatcher({ type: "technologyId", payload: Number(technologyId) });
  }, [technologyId]);

  return (
    <div className="w-1/3 flex justify-start">
      <FormControl sx={{ minWidth: 300 }} error={isNotSelected.technology}>
        <InputLabel id="demo-simple-select-label">Technology</InputLabel>
        <SelectMenu
          defaultValue={technologyId}
          setter={setTechnologyId}
          label="Technology"
          changeHandler={setSelectedTechnology}
        />
        {isNotSelected.technology && (
          <FormHelperText>Must Selcet A Technology</FormHelperText>
        )}
      </FormControl>
    </div>
  );
}

export default TechnologyDropDown;
