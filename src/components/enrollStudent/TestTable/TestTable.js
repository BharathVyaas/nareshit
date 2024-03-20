import { Checkbox, FormControlLabel } from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";

function TestTable({ testData, onTestSelect }) {
  return (
    <div>
      <div className="max-h-[60vh] overflow-y-auto w-4/6 mx-auto border-collapse border border-gray-300">
        <table className="w-full">
          <Thead />
          <Tbody testData={testData} onTestSelect={onTestSelect} />
        </table>
      </div>
    </div>
  );
}

function Thead() {
  return (
    <thead className="bg-gray-100">
      <tr className="border-b border-gray-300">
        <th className="py-3 px-4 text-left w-1/4">Test ID</th>
        <th className="py-3 px-4 text-left w-1/4">Test Name</th>
        <th className="py-3 px-4 text-left w-1/4">Start Date</th>
        <th className="py-3 px-4 text-left w-1/4">End Date</th>
      </tr>
    </thead>
  );
}

function Tbody({ testData, onTestSelect }) {
  return testData.length > 0 ? (
    <tbody>
      {testData.map((test) => (
        <Td key={test.TestID} test={test} onTestSelect={onTestSelect} />
      ))}
    </tbody>
  ) : (
    <div className="h-[6rem] grid place-content-center w-full">
      <i>Must Select A Technology</i>
    </div>
  );
}

function Td({ test, onTestSelect }) {
  return (
    <tr className="border-b border-gray-300 hover:bg-gray-50">
      <td className="py-3 px-4">
        <FormControlLabel
          control={
            <Checkbox
              size=""
              sx={{ padding: 0, margin: 0 }}
              color="default"
              onClick={(e) => onTestSelect(e, test.TestID)}
            />
          }
        />
        {test.TestID}
      </td>
      <td className="py-3 px-4">{test.TestName}</td>
      <td className="py-3 px-4">
        {test.TestStartDate
          ? new Date(test.TestStartDate).toLocaleDateString()
          : ""}
      </td>
      <td className="py-3 px-4">
        {test.TestEndDate
          ? new Date(test.TestEndDate).toLocaleDateString()
          : ""}
      </td>
    </tr>
  );
}

export default TestTable;
