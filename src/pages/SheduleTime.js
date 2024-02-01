import React from "react";
import { Form, redirect } from "react-router-dom";

import { AnimatePresence, motion } from "framer-motion";

function SheduleTime() {
  return (
    <AnimatePresence>
      <motion.main
        initial={{ x: "100%", transition: { duration: 0.3 } }}
        animate={{ x: 0, transition: { duration: 0.3 } }}
      >
        <Form
          method="POST"
          className="max-w-[60%] shadow-xl mx-auto border-2 p-4 flex flex-col justify-center border-gray-200 mt-10"
        >
          <label htmlFor="testName" className="w-full block p-1">
            Test Name
          </label>
          <input
            type="text"
            name="testName"
            id="testName"
            className="w-full border-[1.2px] border-black h-[2.2rem] p-2"
          />
          <label htmlFor="testDescription" className="w-full block p-1">
            Test Description
          </label>
          <input
            type="text"
            name="testDescription"
            id="testDescription"
            className="w-full border-[1.2px] border-black h-[2.2rem] p-2"
          />
          <label htmlFor="startDate" className="w-full block p-1">
            Start Date
          </label>
          <input
            type="date"
            name="startDate"
            id="startDate"
            className="w-full border-[1.2px] border-black h-[2.2rem] p-2"
          />
          <label htmlFor="endDate" className="w-full block p-1">
            End Date
          </label>
          <input
            type="date"
            name="endDate"
            id="endDate"
            className="w-full border-[1.2px] border-black h-[2.2rem] p-2"
          />
          <label htmlFor="startTime" className="w-full block p-1">
            Start Time
          </label>
          <input
            type="date"
            name="startTime"
            id="startTime"
            className="w-full border-[1.2px] border-black h-[2.2rem] p-2"
          />
          <label htmlFor="endTime" className="w-full block p-1">
            End Time
          </label>
          <input
            className="w-full border-[1.2px] border-black h-[2.2rem] p-2"
            type="date"
            name="endTime"
            id="endTime"
          />
          <button className="px-8 py-2 mx-auto mt-4 bg-green-300 hover:bg-green-400">
            Test Prepared
          </button>
        </Form>
      </motion.main>
    </AnimatePresence>
  );
}

export default SheduleTime;

export function action() {
  console.log("action");
  return redirect("/categories/assessmentlist");
}
