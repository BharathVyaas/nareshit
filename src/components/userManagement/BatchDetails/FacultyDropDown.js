import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFacultyList } from "../../../store/root.actions";
import {
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import { setFaculityId } from "../../../store/slice/userManagement.slice";

function FacultyDropDown() {
  const dispatch = useDispatch();
  const { data, isLoading, isError } = useSelector(
    (store) => store.facultyListReducer
  );
  const [selectedFacultyIds, setSelectedFacultyIds] = useState([]);

  useEffect(() => {
    dispatch(setFaculityId(selectedFacultyIds));
  }, [selectedFacultyIds]);

  useEffect(() => {
    dispatch(fetchFacultyList());
  }, []);

  const handleChange = (event) => {
    setSelectedFacultyIds(event.target.value);
  };

  return isLoading ? (
    <p>Loading...</p>
  ) : isError ? (
    <p>Something went wrong. Try refreshing</p>
  ) : data ? (
    <FormControl sx={{ m: 1, width: 300 }}>
      <InputLabel id="demo-multiple-checkbox-label">Faculty</InputLabel>
      <Select
        labelId="demo-multiple-checkbox-label"
        id="demo-multiple-checkbox"
        multiple
        value={selectedFacultyIds}
        onChange={handleChange}
        input={<OutlinedInput label="Faculty" />}
        renderValue={(selected) =>
          selected
            .map((facultyId) => {
              const selectedFaculty = data.find(
                (faculty) => faculty.Facaulty_Id === facultyId
              );
              return selectedFaculty ? selectedFaculty.Facaulty_Name : "";
            })
            .join(", ")
        }
      >
        {data.map((faculty) => (
          <MenuItem key={faculty.Facaulty_Id} value={faculty.Facaulty_Id}>
            <Checkbox
              checked={selectedFacultyIds.indexOf(faculty.Facaulty_Id) > -1}
            />
            <ListItemText primary={faculty.Facaulty_Name} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  ) : (
    <i>No data to display</i>
  );
}

export default FacultyDropDown;
