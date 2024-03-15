import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

function TechnologyNext() {
  const navigate = useNavigate();
  const userSelection = useSelector((store) => store.userSelectionReducer);

  return (
    <Button
      variant="contained"
      onClick={() =>
        navigate(`/categories/assessments/${userSelection.testId}`)
      }
    >
      Next
    </Button>
  );
}

export default TechnologyNext;
