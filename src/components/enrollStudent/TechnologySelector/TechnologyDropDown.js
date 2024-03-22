import { useEffect, useState } from "react";
import axios from "axios";
import SelectMenu from "../../../ui/EnrollStudent/Select";
import { FormControl, FormHelperText, InputLabel } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchTechnologyList } from "../../../store/root.actions";
import { setTechnology } from "../../../store/slice/enrollStudent.slice";

const fetchTechnologies = async (setter) => {
  try {
    const response = await axios.get(
      "https://www.nareshit.net/fetchTechnologies"
    );
    setter(
      response.data.map((tech) => ({
        id: tech.TechnologyID,
        value: tech.TechnologyID,
        option: tech.TechnologyName,
      }))
    );
  } catch (error) {
    console.error(error);
  }
};

function TechnologyDropDown({ dispatcher, isNotSelected }) {
  const dispatch = useDispatch();
  const [technologyId, setTechnologyId] = useState("0");
  const [options, setOptions] = useState([]);

  useEffect(() => {
    fetchTechnologies(setOptions);
  }, []);

  const handleTechnologyChange = (selectedTechnologyId) => {
    dispatch(setTechnology(selectedTechnologyId));
    setTechnologyId(selectedTechnologyId);
  };

  useEffect(() => {
    dispatcher({ type: "technologyId", payload: Number(technologyId) });
  }, [technologyId]);

  useEffect(() => {
    dispatch(fetchTechnologyList());
  }, []);

  return (
    <div className="w-1/3 flex justify-start">
      <FormControl sx={{ minWidth: 300 }} error={isNotSelected.technology}>
        <InputLabel id="technology-dropdown-label">Technology</InputLabel>
        <SelectMenu
          defaultValue={technologyId}
          setter={setTechnologyId}
          label="Technology"
          options={options}
          changeHandler={handleTechnologyChange}
        />
        {isNotSelected.technology && (
          <FormHelperText>Must Select a Technology</FormHelperText>
        )}
      </FormControl>
    </div>
  );
}

export default TechnologyDropDown;
