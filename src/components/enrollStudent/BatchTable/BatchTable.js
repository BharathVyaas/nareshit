import { CheckBox, CheckBoxOutlineBlank } from "@mui/icons-material";
import { Button, Checkbox, FormControlLabel, FormLabel } from "@mui/material";
import React, { useState } from "react";
import eyeIcon from "../../../assets/eye.png";

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
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> origin/master
        <th className="text-start py-2 ps-8 xl:w-[35%] lg:w-[45%] sm:w-[45%] w-[70%] hover:cursor-pointer">
          Batch Name
        </th>
        <th className="text-start py-2 xl:w-[30%] lg:w-[30%] sm:w-[25%] invisible sm:visible hover:cursor-default">
          Faculty
        </th>
        <th className="text-start py-2 xl:w-[20%] invisible lg:visible lg:w-[20%] hover:cursor-default">
          Timings
        </th>
        <th className="py-2 visible lg:hidden w-[15%]">View</th>
        <th className="text-start py-2 xl:w-[15%] invisible xl:visible  hover:cursor-default">
<<<<<<< HEAD
=======
=======
        <th className="text-start py-2 ps-8 xl:w-[35%] lg:w-[45%] sm:w-[45%] w-[70%]">
          Batch Name
        </th>
        <th className="text-start py-2 xl:w-[30%] lg:w-[30%] sm:w-[25%] invisible sm:visible">
          Faculty
        </th>
        <th className="text-start py-2 xl:w-[20%] invisible lg:visible lg:w-[20%]">
          Timings
        </th>
        <th className="py-2 visible lg:hidden w-[15%]">View</th>
        <th className="text-start py-2 xl:w-[15%] invisible xl:visible">
>>>>>>> a30fca1893a425daee4853497f0f827b3ceead45
>>>>>>> origin/master
          Active Users
        </th>
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
      <Td />
      <Td />
      <Td />
    </tbody>
  );
}

function Td() {
  return (
    <tr className="border-b-2 border-dotted border-gray-600">
<<<<<<< HEAD
      <td className="py-2 lg:w-[45%] sm:w-[45%] w-[70%] hover:underline hover:cursor-pointer hover:underline">
=======
<<<<<<< HEAD
      <td className="py-2 lg:w-[45%] sm:w-[45%] w-[70%] hover:underline hover:cursor-pointer hover:underline">
=======
      <td className="py-2 lg:w-[45%] sm:w-[45%] w-[70%] hover:underline hover:cursor-pointer">
>>>>>>> a30fca1893a425daee4853497f0f827b3ceead45
>>>>>>> origin/master
        <FormControlLabel
          control={
            <Checkbox
              size=""
              sx={{ marginInlineEnd: 2 }}
              color="default"
              defaultChecked
            />
          }
          label="PlaceHolder Dunking"
        />
      </td>
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> origin/master
      <td className="py-2 lg:w-[30%] sm:w-[30%] invisible sm:visible hover:cursor-default">
        Dude Perfect
      </td>
      <td className="py-2 invisible lg:visible lg:w-[20%] hover:cursor-default">Morning</td>
      <td className="py-2 visible lg:hidden hover:cursor-pointer hover:cursor-default">
        <img src={eyeIcon} alt="view" width="20" className="mx-auto" />
      </td>
      <td className="py-2 px-2 invisible xl:visible hover:cursor-default">2</td>
    </tr>
  );
<<<<<<< HEAD
}
=======
}
=======
      <td className="py-2 lg:w-[30%] sm:w-[30%] invisible sm:visible">
        Dude Perfect
      </td>
      <td className="py-2 invisible lg:visible lg:w-[20%]">Morning</td>
      <td className="py-2 visible lg:hidden hover:cursor-pointer">
        <img src={eyeIcon} alt="view" width="20" className="mx-auto" />
      </td>
      <td className="py-2 px-2 invisible xl:visible">2</td>
    </tr>
  );
}
>>>>>>> a30fca1893a425daee4853497f0f827b3ceead45
>>>>>>> origin/master
