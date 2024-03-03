import { CheckBox, CheckBoxOutlineBlank } from "@mui/icons-material";
import React from "react";

function BatchTable() {
  return (
    <table className="table-fixed w-4/6 mx-auto">
      <Thead />
      <Tbody />
    </table>
  );
}

export default BatchTable;

function Thead() {
  return (
    <thead className="">
      <tr className="border-b-2 border-dotted border-gray-600">
        <th className="text-start py-2 w-[5%]"></th>
        <th className="text-start py-2 w-[20%]">Batch Name</th>
        <th className="text-start py-2 w-[10%]">Active Users</th>
        <th className="text-start py-2 w-[10%]">Timings</th>
        <th className="text-start py-2 w-[10%]">Faculty</th>
      </tr>
    </thead>
  );
}

function Tbody() {
  return (
    <tbody>
      <Td flag={true} />
      <Td flag={false} />
      <Td flag={true} />
      <Td flag={false} />
      <Td flag={true} />
      <Td flag={false} />
      <Td flag={true} />
      <Td flag={false} />
      <Td flag={true} />
    </tbody>
  );
}

function Td({ flag }) {
  return (
    <tr className="border-b-2 border-dotted border-gray-600">
      <td className="text-center">
        <button className="cursor-pointer">
          {flag ? (
            <CheckBox sx={{ fontSize: 16 }} />
          ) : (
            <CheckBoxOutlineBlank sx={{ fontSize: 16 }} />
          )}
        </button>
      </td>
      <td className="py-2">PlaceHolder Dunking</td>
      <td className="py-2 px-2">2</td>
      <td className="py-2">Morning</td>
      <td className="py-2">Dude Perfect</td>
    </tr>
  );
}
