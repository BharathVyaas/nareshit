import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { userSelectionAction } from "../../store/root.actions";

function Random() {
  const dispatch = useDispatch();
  const technologyPageDetails = useSelector(
    (store) => store.technologyPageReducer
  );
  const [selectedRandom, setSelectedRandom] = useState("1");

  useEffect(() => {
    setSelectedRandom(String(technologyPageDetails.data?.RandomID));
  }, [technologyPageDetails.data?.RandomID]);

  useEffect(() => {
    dispatch(userSelectionAction.setRandom(selectedRandom));
  }, [selectedRandom]);

  const onSelectionChange = (e) => {
    setSelectedRandom(e.target.value);
  };

  return (
    <FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label">Random</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        value={selectedRandom}
        onChange={onSelectionChange}
      >
        <FormControlLabel value="1" control={<Radio />} label="Complete Test" />
        <FormControlLabel
          value="2"
          control={<Radio />}
          label="Module Wise Random"
        />
        <FormControlLabel value="3" control={<Radio />} label="No Random" />
      </RadioGroup>
    </FormControl>
  );
}

export default Random;
