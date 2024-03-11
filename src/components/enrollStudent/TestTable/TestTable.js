<<<<<<< HEAD
=======
import eyeIcon from "../../../assets/eye.png";

>>>>>>> a30fca1893a425daee4853497f0f827b3ceead45
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
<<<<<<< HEAD
        <th className="text-start py-2 w-[10%] ps-2">Test ID</th>
        <th className="text-start py-2 w-[20%]">Test Name</th>
        <th className="text-start py-2 w-[10%]">Start Date</th>
        <th className="text-start py-2 w-[10%]">End Date</th>
=======
        <th className="ps-2 text-start py-2 w-[30%] ">Test ID</th>
        <th className="text-start py-2 w-[70%]">Test Name</th>
        <th className="text-start py-2 w-[10%] invisible md:visible">
          Start Date
        </th>
        <th className="text-start py-2 w-[10%] invisible md:visible">
          End Date
        </th>
        <th className="py-2 visible lg:hidden w-[15%]">View</th>
>>>>>>> a30fca1893a425daee4853497f0f827b3ceead45
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
<<<<<<< HEAD
      <td className="py-2 ps-2">26-2-2024</td>
      <td className="py-2 ps-2">27-2-2024</td>
=======
      <td className="py-2 ps-2 invisible md:visible">26-2-2024</td>
      <td className="py-2 ps-2 invisible md:visible">27-2-2024</td>
      <th className="py-2 visible lg:hidden w-[15%]">
        <img src={eyeIcon} alt="view" width="20" className="mx-auto" />
      </th>
>>>>>>> a30fca1893a425daee4853497f0f827b3ceead45
    </tr>
  );
}
