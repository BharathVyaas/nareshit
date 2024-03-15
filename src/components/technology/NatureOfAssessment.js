import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userSelectionAction } from "../../store/root.actions";

function NatureOfAssessment() {
  const dispatch = useDispatch();
  const technologyPageDetails = useSelector(
    (store) => store.technologyPageReducer
  );
  const [selectedAssessment, setSelectedAssessment] = useState("1");

  useEffect(() => {
    console.log(technologyPageDetails);
    setSelectedAssessment(String(technologyPageDetails.data?.NatureID));
  }, [technologyPageDetails.data?.NatureID]);

  useEffect(() => {
    dispatch(userSelectionAction.setNatureOfAssessment(selectedAssessment));
  }, [selectedAssessment]);

  const onSelectionChange = (e) => {
    setSelectedAssessment(e.target.value);
  };

  return (
    <div className="mx-4">
      <FormControl>
        <FormLabel id="demo-row-radio-buttons-group-label">
          Nature of Assessment
        </FormLabel>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
          value={selectedAssessment}
          onChange={onSelectionChange}
        >
          <FormControlLabel value="1" control={<Radio />} label="Dynamic" />
          <FormControlLabel value="2" control={<Radio />} label="Fixed" />
        </RadioGroup>
      </FormControl>
    </div>
  );
}

export default NatureOfAssessment;
