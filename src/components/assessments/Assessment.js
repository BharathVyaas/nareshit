import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  OutlinedInput,
} from "@mui/material";
import useAssessmentCounts from "../../hooks/Assessment/useAssessmentCounts";

function Assessment({ easyCount, mediumCount, hardCount }) {
  const [count, dispatcher] = useAssessmentCounts(
    easyCount,
    mediumCount,
    hardCount
  );

  return (
    <div>
      <div>
        <div>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox defaultChecked disabled />}
              label="MCQ"
            />
          </FormGroup>
        </div>

        <div>
          <div>
            <div className="flex">
              <p>Number of Questions:</p>
              <OutlinedInput
                type="number"
                size="small"
                value={count.total}
                onChange={(e) => dispatcher("total", e.target.value)}
              />
            </div>
          </div>

          <div className="flex">
            <div className="flex">
              <p>Easy:</p>
              <OutlinedInput
                type="number"
                size="small"
                value={count.easy}
                onChange={(e) => dispatcher("easy", e.target.value)}
              />
            </div>
            <div className="flex">
              <p>Medium:</p>
              <OutlinedInput
                type="number"
                size="small"
                value={count.medium}
                onChange={(e) => dispatcher("medium", e.target.value)}
              />
            </div>
            <div className="flex">
              <p>Hard:</p>
              <OutlinedInput
                type="number"
                size="small"
                value={count.hard}
                onChange={(e) => dispatcher("hard", e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Assessment;
