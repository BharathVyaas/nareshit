import React from "react";

function TestTable({ fetchBatchData, testData }) {
  return (
    <div>
    <div className="max-h-[600px] overflow-y-auto w-4/6 mx-auto border-collapse border border-gray-300">
      <table className="w-full">
        <Thead />
        <Tbody fetchBatchData={fetchBatchData} testData={testData} />
      </table>
    </div></div>
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

function Tbody({ fetchBatchData, testData }) {
  return (
    testData.length > 0?<tbody>
      {testData.map((test) => (
        <Td key={test.TestID} fetchBatchData={fetchBatchData} test={test} />
      ))}
    </tbody>: <div className="h-[6rem] grid place-content-center w-full"><i>Must Select A Technology</i></div>
  );
}

function Td({ fetchBatchData, test }) {
  return (
    <tr className="border-b border-gray-300 hover:bg-gray-50">
      <td className="py-3 px-4">
        <button
          className="text-blue-500 hover:text-blue-600 underline"
          onClick={() => fetchBatchData(test.TestID)}
        >
          {test.TestID}
        </button>
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
