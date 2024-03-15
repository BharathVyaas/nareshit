import TechnologySelector from "../components/questionViews/TechnologySelector";
import { Button, Typography } from "@mui/material";
import { useSelector } from "react-redux";

function QuestionView() {
  const userSelection = useSelector((state) => state.userSelectionReducer);

  return (
    <div>
      <div className="flex justify-between">
        <Typography>
          Selected Technology: {userSelection?.technology?.TechnologyName || ""}
        </Typography>
        <div className="flex">
          <Button variant="contained">Set Question Template</Button>
          <Button variant="contained">Save</Button>
        </div>
      </div>
      <div>
        <TechnologySelector />
      </div>
    </div>
  );
}

export default QuestionView;
