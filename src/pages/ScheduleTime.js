import React, { useEffect, useRef, useState } from "react";
import { Form, redirect } from "react-router-dom";

import { AnimatePresence, motion } from "framer-motion";
import ScheduleTimeService from "../services/scheduleTimeService";
import BuilderService from "../services/builder";
import { LocalStorage } from "../services/LocalStorage";
import axios from "axios";

function ScheduleTime() {
  const testNameRef = useRef();
  const testDescriptionRef = useRef();
  const startDateRef = useRef();
  const endDateRef = useRef();
  const startTimeRef = useRef();
  const endTimeRef = useRef();

  const [testName, setTestName] = useState("");
  const [testDescription, setTestDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const [isValid, setIsValid] = useState(false);
  const [isDateValid, setIsDateValid] = useState(false);
  const [isTimeValid, setIsTimeValid] = useState(false);
  const [isTestValid, setIsTestValid] = useState(false);

  BuilderService.scheduleTimeService.scheduleTimeData.testName = testName;
  BuilderService.scheduleTimeService.scheduleTimeData.testDescription =
    testDescription;
  BuilderService.scheduleTimeService.scheduleTimeData.startDate = startDate;
  BuilderService.scheduleTimeService.scheduleTimeData.endDate = endDate;
  BuilderService.scheduleTimeService.scheduleTimeData.startTime = startTime;
  BuilderService.scheduleTimeService.scheduleTimeData.endTime = endTime;

  useEffect(() => {
    if (startDate && endDate) {
      const startDateTime = new Date(startDate).toISOString();
      const endDateTime = new Date(endDate).toISOString();

      setIsDateValid(startDateTime <= endDateTime);
    }
  }, [startDate, endDate]);

  useEffect(() => {
    if (startTime && endTime) {
      const dummyDate = "2022-01-01";
      const startDateTime = new Date(dummyDate + "T" + startTime);
      const endDateTime = new Date(dummyDate + "T" + endTime);

      setIsTimeValid(startDateTime.getTime() <= endDateTime.getTime());
    }
  }, [startTime, endTime]);

  useEffect(() => {
    setIsTestValid(testName && testDescription);
  }, [testName, testDescription]);

  useEffect(() => {
    setIsValid(isTimeValid && isTestValid && isDateValid);
  }, [isTimeValid, isDateValid, isTestValid]);

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
            value={testName}
            onChange={(e) => setTestName(e.target.value)}
            className="w-full border-[1.2px]  _text-start border-black h-[2.2rem] p-2"
          />
          <label htmlFor="testDescription" className="w-full block p-1">
            Test Description
          </label>
          <input
            type="text"
            name="testDescription"
            id="testDescription"
            value={testDescription}
            onChange={(e) => setTestDescription(e.target.value)}
            className="w-full border-[1.2px]  _text-start border-black h-[2.2rem] p-2"
          />
          <label htmlFor="startDate" className="w-full block p-1">
            Start Date
          </label>
          <input
            type="date"
            name="startDate"
            id="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full border-[1.2px]  _text-start border-black h-[2.2rem] p-2"
          />
          <label htmlFor="endDate" className="w-full block p-1">
            End Date
          </label>
          <input
            type="date"
            name="endDate"
            id="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full border-[1.2px]  _text-start border-black h-[2.2rem] p-2"
          />
          <label htmlFor="startTime" className="w-full block p-1">
            Start Time
          </label>
          <input
            type="time"
            name="startTime"
            id="startTime"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="w-full border-[1.2px]  _text-start border-black h-[2.2rem] p-2"
          />
          <label htmlFor="endTime" className="w-full block p-1">
            End Time
          </label>
          <input
            className="w-full border-[1.2px]  _text-start border-black h-[2.2rem] p-2"
            type="time"
            name="endTime"
            id="endTime"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
          <button
            disabled={!isValid}
            onClick={() => console.log(BuilderService)}
            className="px-8 py-2 mx-auto mt-4 bg-green-300 hover:bg-green-400"
          >
            Test Prepared
          </button>
        </Form>
      </motion.main>
    </AnimatePresence>
  );
}

export default ScheduleTime;

export async function action() {
  const data = {};

  const startDate = new Date(
    BuilderService.scheduleTimeService.scheduleTimeData.startDate
  ).toString();

  const endDate = new Date(
    BuilderService.scheduleTimeService.scheduleTimeData.startDate
  ).toString();

  data["TestID"] = 15723;
  data["TestName"] =
    BuilderService.scheduleTimeService.scheduleTimeData.testName;
  data["TestStartDate"] =
    BuilderService.scheduleTimeService.scheduleTimeData.testDescription;
  data["TestEndDate"] = startDate;
  data["TestStartTime"] = endDate;
  data["TestEndTime"] =
    BuilderService.scheduleTimeService.scheduleTimeData.startTime + ":00";
  data["TestDescription"] =
    BuilderService.scheduleTimeService.scheduleTimeData.endTime + ":00";

  const res = await axios.post("https://www.nareshit.net/updateTest", { data });

  console.log(res);

  return 1;
}
