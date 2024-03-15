import { Button, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAssessmentPageDetails,
  userSelectionAction,
} from "../store/root.actions";
import { useParams } from "react-router";
import Assessment from "../components/assessments/Assessment";
import AssessmentsNext from "../components/assessments/AssessmentsNext";

function Assessments() {
  const dispatch = useDispatch();
  const { testId } = useParams();
  const userSelection = useSelector((store) => store.userSelectionReducer);
  const assessmentPageDetails = useSelector(
    (store) => store.assessmentPageReducer
  );

  useEffect(() => {
    if (testId) dispatch(fetchAssessmentPageDetails(testId));
    else console.warn("trying to fetch assessment page details without testId");
  }, []);

  useEffect(() => {
    dispatch(
      userSelectionAction.setTestDetailsId(
        String(assessmentPageDetails.data.TestDetailsID)
      )
    );
  }, [assessmentPageDetails.data.TestDetailsID]);

  return (
    <div>
      <Typography>
        Selected Technology: {userSelection.technology?.TechnologyName || ""}
      </Typography>

      <Assessment
        easyCount={assessmentPageDetails.data.NumOfEasy}
        mediumCount={assessmentPageDetails.data.NumOfMedium}
        hardCount={assessmentPageDetails.data.NumOfHard}
      />

      <AssessmentsNext />
    </div>
  );
}

export default Assessments;
