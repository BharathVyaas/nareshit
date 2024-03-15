import React, { useEffect, useState } from "react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

import { useDispatch, useSelector } from "react-redux";
import { AgGridReact } from "ag-grid-react";
import { Button } from "@mui/material";

import { fetchAssessmentList } from "../store/root.actions";
import useGridReady from "../hooks/ListOfAssessments/useGridReady";

/**
 * Component to display a list of assessments.
 * @returns JSX.Element
 */
function ListOfAssessment() {
  const dispatch = useDispatch();
  const [rowData, setRowData] = useState([]);
  const { onGridReady } = useGridReady();
  const assessmentList = useSelector(
    (store) => store.listOfAssessmentPageReducer
  );

  useEffect(() => {
    dispatch(fetchAssessmentList());
  }, [dispatch]);

  /**
   * Effect to format assessment list data when it changes.
   */
  useEffect(() => {
    if (assessmentList.data.length > 0) {
      const formattedData = formatAssessmentList(assessmentList.data);
      setRowData(formattedData);
    }
  }, [assessmentList]);

  /**
   * Function to format assessment list data.
   * @param {Array} list - List of assessments
   * @returns {Array} Formatted list of assessments
   */
  const formatAssessmentList = (list) => {
    return list.map((assessment) => ({
      TestName: assessment.TestName,
      IsActive: assessment.IsActive,
      // Making sure that date column is filled
      StartDate: assessment.TestStartDate
        ? new Date(assessment.TestStartDate)
        : "Not Added",
      EndDate: assessment.TestEndDate
        ? new Date(assessment.TestEndDate)
        : "Not Added",
      StartTime: assessment.TestStartTime
        ? new Date(assessment.TestStartTime)
        : "Not Added",
      EndTime: assessment.TestEndTime
        ? new Date(assessment.TestEndTime)
        : "Not Added",
      CreatedBy: assessment.CreatedBy,
      CreatedAt: new Date(assessment.CreatedAt),
    }));
  };

  return (
    <div className="container mx-auto my-8">
      {/**  to create new Assessment. */}
      <Button variant="contained" className="mb-4">
        Create New
      </Button>
      {/**  List of Assessments */}
      <div
        className="ag-theme-alpine"
        style={{ height: "500px", width: "100%", margin: "1rem auto" }}
      >
        {rowData.length > 0 ? (
          <AgGridReact onGridReady={onGridReady} rowData={rowData} />
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
}

export default ListOfAssessment;
