import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMentorList } from "../../../store/root.actions";
import {
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import { setMentorId } from "../../../store/slice/userManagement.slice";

function MentorDropDown() {
  const dispatch = useDispatch();
  const { data, isLoading, isError } = useSelector(
    (store) => store.mentorListReducer
  );

  const [selectedMentorIds, setSelectedMentorIds] = useState([]);

  useEffect(() => {
    dispatch(fetchMentorList());
  }, []);

  useEffect(() => {
    dispatch(setMentorId(selectedMentorIds));
  }, [selectedMentorIds]);

  const handleChange = (event) => {
    setSelectedMentorIds(event.target.value);
  };

  return isLoading ? (
    <p>Loading...</p>
  ) : isError ? (
    <p>Something went wrong. Try refreshing</p>
  ) : data ? (
    <FormControl sx={{ m: 1, width: 300 }}>
      <InputLabel id="demo-multiple-checkbox-label">Mentor</InputLabel>
      <Select
        labelId="demo-multiple-checkbox-label"
        id="demo-multiple-checkbox"
        multiple
        value={selectedMentorIds}
        onChange={handleChange}
        input={<OutlinedInput label="Mentor" />}
        renderValue={(selected) =>
          selected
            .map((mentorId) => {
              const selectedMentor = data.find(
                (mentor) => mentor.MENTOR_Id === mentorId
              );
              return selectedMentor ? selectedMentor.Mentor_Name : "";
            })
            .join(", ")
        }
      >
        {data.map((mentor) => (
          <MenuItem key={mentor.MENTOR_Id} value={mentor.MENTOR_Id}>
            <Checkbox
              checked={selectedMentorIds.indexOf(mentor.MENTOR_Id) > -1}
            />
            <ListItemText primary={mentor.Mentor_Name} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  ) : (
    <i>No data to display</i>
  );
}

export default MentorDropDown;
