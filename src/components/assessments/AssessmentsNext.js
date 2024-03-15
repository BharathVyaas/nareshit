import { Button } from "@mui/material";
import { useNavigate } from "react-router";

function AssessmentsNext() {
  const navigate = useNavigate();
  return (
    <Button
      variant="contained"
      onClick={() => navigate(`/categories/questionview`)}
    >
      Next
    </Button>
  );
}

export default AssessmentsNext;
