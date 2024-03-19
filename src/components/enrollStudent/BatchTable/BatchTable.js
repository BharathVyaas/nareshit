
import {  Checkbox, FormControlLabel } from "@mui/material";
import React from "react";

function BatchTable({batchData,fetchstudentsHandler, setModal}) {
  return (
    <div>
      <div className="max-h-[600px] overflow-y-auto w-4/6 mx-auto border-collapse border border-gray-300">
    <table className="w-full">
      <Thead />
      <Tbody batchData={batchData} fetchstudentsHandler={fetchstudentsHandler} setModal={setModal} />
    </table></div></div>
  );
}

export default BatchTable;

function Thead() {
  return (
    <thead className="bg-gray-100">
      <tr className="border-b border-gray-300">
      <th className="py-3 px-4 text-left w-1/6">
          BatchId
        </th>
        <th className="py-3 px-4 text-left w-2/6">
          Batch Name
        </th>
        <th className="py-3 px-4 text-left w-1/6">
          Faculty
        </th>
        <th className="py-3 px-4 text-left w-1/6">
          Timings
        </th>
        <th className="py-3 px-4 text-left w-1/6">
          Active Users
        </th>
      </tr>
    </thead>
  );
}

function Tbody({batchData, fetchstudentsHandler, setModal}) {
  return (
    batchData.length > 0 ? <tbody>
      {batchData && batchData.map(batch => <Td batch={batch} fetchstudentsHandler={fetchstudentsHandler} setModal={setModal} />)}
    </tbody>: <div className="h-[6rem] grid place-content-center w-full"><i>Must Select A Test</i></div>
  );
}

function Td({batch, fetchstudentsHandler, setModal}) {
  
  return (
    <tr className="border-b border-gray-300 hover:bg-gray-50">
      <td className="py-3 px-4"><FormControlLabel
          control={
            <Checkbox
              size=""
              sx={{padding: 0, margin: 0}}
              color="default"
              defaultChecked
            />
          }
        /><button className="text-blue-500 hover:text-blue-600 underline" onClick={() => {
          fetchstudentsHandler(batch.BatchId, setModal)}}>{batch.BatchId}</button></td>
      <td className="py-3 px-4">
        {batch.BatchName}
      </td>
      <td className="py-3 px-4">
        { batch.CreatedBy}
      </td>
      <td className="py-3 px-4">{batch.CreatedAt ? new Date(batch.CreatedAt).toLocaleDateString(): ''}</td>
      <td className="py-3 px-4">2</td>
    </tr>
  );
}
