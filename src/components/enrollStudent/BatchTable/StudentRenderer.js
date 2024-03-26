import React, { useState } from "react";
import { Checkbox, Input } from "@mui/material";
import { Table, Column } from "react-virtualized";
import "react-virtualized/styles.css";
import { useDispatch, useSelector } from "react-redux";
import { setExcludedArray } from "../../../store/slice/enrollStudent.slice";

function StudentRenderer({ students, testId, batchId }) {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const { excludedStudents } = useSelector(
    (store) => store.enrollStudentReducer
  );

  const onStudentSelection = (e, student, hashedStudentId) => {
    const flag = e.target.checked;
    if (flag) {
      if (
        typeof excludedStudents === "object" &&
        excludedStudents.includes(hashedStudentId)
      ) {
        const index = excludedStudents.indexOf(hashedStudentId);

        if (index < 0)
          console.warn("Trying to remove student that doesn't exist.");
        else {
          const updatedExcludes = [...excludedStudents];
          updatedExcludes.splice(index, 1);
          console.log(updatedExcludes);
          dispatch(setExcludedArray(updatedExcludes));
        }
      }
    } else {
      dispatch(setExcludedArray([...excludedStudents, hashedStudentId]));
    }
  };

  const filteredStudents = students.filter((student) => {
    const studentName =
      student?.FirstName || "" + " " + student?.LastName || "";

    return studentName.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const rowRenderer = ({ index, key, style }) => {
    const student = filteredStudents[index];
    const hashedStudentId = testId + ":" + batchId + ":" + student.StudentID;

    return (
      <div key={key} style={style}>
        <div className="border-b border-gray-300 flex items-center py-2">
          <div style={{ width: 100 }}>
            <Checkbox
              size=""
              color="default"
              checked={!excludedStudents.includes(hashedStudentId)}
              onClick={(e) => onStudentSelection(e, student, hashedStudentId)}
            />

            {student.StudentID}
          </div>
          <div style={{ width: 200 }}>
            {student.FirstName} {student.LastName}
          </div>
          <div style={{ width: 300 }}>{student.Email}</div>
          <div style={{ width: 150 }}>{student.PhoneNumber}</div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="flex items-center justify-end mb-7 w-[750px]">
        <Input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by name"
          className="me-8"
        />
      </div>
      <div>
        <Table
          width={750}
          height={400}
          rowHeight={50}
          rowCount={filteredStudents.length}
          rowGetter={({ index }) => filteredStudents[index]}
          rowRenderer={rowRenderer}
          headerHeight={40}
        >
          <Column label="ID" dataKey="StudentID" width={100} />
          <Column label="Student Name" dataKey="FirstName" width={200} />
          <Column label="Email" dataKey="Email" width={300} />
          <Column label="Contact" dataKey="PhoneNumber" width={150} />
        </Table>
      </div>
    </div>
  );
}
export default StudentRenderer;
