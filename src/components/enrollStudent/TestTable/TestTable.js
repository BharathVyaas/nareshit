function TestTable() {
  return (
    <table className="table-fixed w-4/6 mx-auto">
      <Thead />
      <Tbody />
    </table>
  );
}

export default TestTable;

function Thead() {
  return (
    <thead className="">
      <tr className="border-b-2 border-dotted border-gray-600">
        <th className="text-start py-2 w-[10%] ps-2">Test ID</th>
        <th className="text-start py-2 w-[20%]">Test Name</th>
        <th className="text-start py-2 w-[10%]">Start Date</th>
        <th className="text-start py-2 w-[10%]">End Date</th>
      </tr>
    </thead>
  );
}

function Tbody() {
  return (
    <tbody>
      <Td />
      <Td />
      <Td />
      <Td />
      <Td />
      <Td />
    </tbody>
  );
}

function Td() {
  return (
    <tr className="border-b-2 border-dotted border-gray-600">
      <td className="py-2 ps-2">100</td>
      <td className="py-2 ps-2">Table Testing 101.web</td>
      <td className="py-2 ps-2">26-2-2024</td>
      <td className="py-2 ps-2">27-2-2024</td>
    </tr>
  );
}
