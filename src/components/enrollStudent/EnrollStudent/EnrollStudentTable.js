import { Checkbox, FormControlLabel } from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";

function EnrollStudentTable() {
  return (
    <div>
      <div className="max-h-[60vh] overflow-y-auto w-4/6 mx-auto border-collapse border border-gray-300">
        <table className="w-full">
          <Thead />
          <Tbody />
        </table>
      </div>
    </div>
  );
}

export default EnrollStudentTable;

function Thead() {
  return (
    <thead className="bg-gray-100">
      <tr className="border-b border-gray-300">
        <th className="py-3 px-4 text-left w-1/6">BatchId</th>
        <th className="py-3 px-4 text-left w-2/6">Batch Name</th>
        <th className="py-3 px-4 text-left w-1/6">Faculty</th>
        <th className="py-3 px-4 text-left w-1/6">Timings</th>
        <th className="py-3 px-4 text-left w-1/6">Active Users</th>
      </tr>
    </thead>
  );
}

function Tbody({ batchData, onBatchSelect }) {
  return <tbody></tbody>;
}

function Td({ batch, onBatchSelect }) {
  return (
    <tr className="border-b border-gray-300 hover:bg-gray-50">
      <td className="py-3 px-4">
        <NavLink
          className="text-blue-500 hover:text-blue-600 underline underline-offset-[3px]"
          to={`/enroll-student/student-selection/${batch.BatchId}`}
        >
          {batch.BatchId}
        </NavLink>
      </td>
      <td className="py-3 px-4">{batch.BatchName}</td>
      <td className="py-3 px-4">{batch.CreatedBy}</td>
      <td className="py-3 px-4">
        {batch.CreatedAt ? new Date(batch.CreatedAt).toLocaleDateString() : ""}
      </td>
      <td className="py-3 px-4">2</td>
    </tr>
  );
}
