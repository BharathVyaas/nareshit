import React, { useState } from "react";
import { Checkbox, Button } from "@mui/material";
import { Table, Column } from "react-virtualized";
import "react-virtualized/styles.css";
import { useDispatch, useSelector } from "react-redux";
import {
  includeStudentListByBatchId,
  insertIncludedStudent,
  removeStudentFromIncludes,
  removeStudentListByBatchId,
} from "../../../store/slice/enrollStudent.slice";

function StudentRenderer({ students, testId, batchId }) {
  const dispatch = useDispatch();
  const { includedStudents } = useSelector(
    (store) => store.enrollStudentReducer
  );

  const onStudentSelection = (e, student) => {
    const flag = e.target.checked;

    if (flag) {
      dispatch(
        insertIncludedStudent({ testId, batchId, studentId: student.StudentID })
      );
    } else {
      dispatch(
        removeStudentFromIncludes({
          testId,
          batchId,
          studentId: student.StudentID,
        })
      );
    }
  };

  const includeAllHandler = () => {
    dispatch(
      includeStudentListByBatchId({
        testId,
        batchId,
        studentList: students.map((student) => student.StudentID),
      })
    );
  };

  const excludeAllHandler = () => {
    dispatch(removeStudentListByBatchId({ testId, batchId }));
  };
  const rowRenderer = ({ index, key, style }) => {
    const student = students[index];

    console.log(
      includedStudents?.[testId]?.[batchId]?.includes(student.StudentID) ||
        false
    );
    return (
      <div key={key} style={style}>
        <div className="border-b border-gray-300 flex items-center py-2">
          <div style={{ width: 100 }}>
            <Checkbox
              size=""
              color="default"
              checked={
                includedStudents?.[testId]?.[batchId]?.includes(
                  student.StudentID
                ) || false
              }
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
      <div className="flex">
        <Button onClick={includeAllHandler}>Include All</Button>
        <Button onClick={excludeAllHandler}>Exclude All</Button>
      </div>
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
    </div>
  );
}
export default StudentRenderer;
