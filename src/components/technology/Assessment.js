import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import React from "react";

function Assessment() {
  return (
    <FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label"></FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="Assessment"
      >
        <FormControlLabel
          value="1"
          disabled
          checked
          control={<Radio />}
          label="Assessment"
        />
      </RadioGroup>
    </FormControl>
  );
}

export default Assessment;
