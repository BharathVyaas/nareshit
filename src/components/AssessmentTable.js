import React from "react";

function AssessmentTable({ titles, assessments }) {
  return (
    <table className="mt-3  border-[2px] border-slate-400">
      <caption className="absolute left-[-9999px]">Assessment Details</caption>
      <thead>
        <TableHead titles={titles} />
      </thead>
      <tbody>
        {assessments.map((element) => {
          return <TableBodyRenderer key={element.id} element={element} />;
        })}
      </tbody>
    </table>
  );
}

export default AssessmentTable;

function TableHead({ titles }) {
  return (
    <tr className="border-2 border-black">
      {titles.map(({ title, id }) => (
        <th className="px-5 border-x-2 border-black" key={id}>
          {title}
        </th>
      ))}
    </tr>
  );
}

function TableBodyRenderer({ element }) {
  return (
    <tr key={element.id}>
      <Tbody data={element.testName} />
      <Tbody data={element.isActive} />
      <Tbody data={element.startDate} />
      <Tbody data={element.endDate} />
      <Tbody data={element.startTime} />
      <Tbody data={element.endTime} />
    </tr>
  );
}

function Tbody({ data }) {
  return (
    <td className="px-5 text-center py-1 border-[1.9px] border-slate-400">
      {data}
    </td>
  );
}
