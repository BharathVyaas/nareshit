import React, { useState } from "react";
import { Checkbox, Button } from "@mui/material";
import { Table, Column } from "react-virtualized";
import "react-virtualized/styles.css";
import { useDispatch, useSelector } from "react-redux";
import {
  insertExcludedStudent,
  removeStudentFromExcludes,
} from "../../../store/slice/enrollStudent.slice";

function StudentRenderer({ students, testId, batchId }) {
  const dispatch = useDispatch();
  const { excludedStudents } = useSelector(
    (store) => store.enrollStudentReducer
  );

  const onStudentSelection = (e, student) => {
    const flag = e.target.checked;

    if (flag) {
      dispatch(
        insertExcludedStudent({ testId, batchId, studentId: student.StudentID })
      );
    } else {
      dispatch(
        removeStudentFromExcludes({
          testId,
          batchId,
          studentId: student.StudentID,
        })
      );
    }
  };

  const rowRenderer = ({ index, key, style }) => {
    const student = students[index];

    return (
      <div key={key} style={style}>
        <div className="border-b border-gray-300 flex items-center py-2">
          <div style={{ width: 100 }}>
            <Checkbox
              size=""
              color="default"
              onClick={(e) => onStudentSelection(e, student)}
            />
            {student.StudentID}
          </div>
          <div style={{ width: 200 }}>
            {student.FirstName} {student.LastName}
          </div>
          <div style={{ width: 300 }}>{student.Email}</div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <Table
        width={600}
        height={400}
        rowHeight={50}
        rowCount={students.length}
        rowGetter={({ index }) => students[index]}
        rowRenderer={rowRenderer}
        headerHeight={40}
      >
        <Column label="ID" dataKey="StudentID" width={100} />
        <Column label="FirstName" dataKey="FirstName" width={200} />
        <Column label="Email" dataKey="Email" width={300} />
      </Table>
    </div>
  );
}
export default StudentRenderer;
