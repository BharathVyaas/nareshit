<<<<<<< HEAD
import React, { useContext, useEffect, useState } from "react";
import { Form, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import axios from "axios";
import AuthCtx from "../context/auth.context";

function ScheduleTime() {
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(AuthCtx);

  useEffect(() => {
    if (!isLoggedIn) navigate("/login?page=/categories/scheduletime");
  }, [isLoggedIn, navigate]);
=======
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
>>>>>>> origin/main

  const [testName, setTestName] = useState("");
  const [testDescription, setTestDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

<<<<<<< HEAD
  const [scheduleLater, setScheduleLater] = useState(false);

  const [isValid, setIsValid] = useState(false);
  const [isDateValid, setIsDateValid] = useState();
  const [isTimeValid, setIsTimeValid] = useState(true);
  const [isTestValid, setIsTestValid] = useState();

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (startDate && endDate) {
      const today = new Date();
      const startDateObj = new Date(startDate);
      const endDateObj = new Date(endDate);

      console.log(new Date(startDate), startDate);

      const isStartDateValid = startDateObj >= today;
      const isEndDateValid = startDateObj <= endDateObj;

      setIsDateValid(isStartDateValid && isEndDateValid);
=======
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
>>>>>>> origin/main
    }
  }, [startDate, endDate]);

  useEffect(() => {
<<<<<<< HEAD
    setIsTestValid(testName);
  }, [testName, testDescription]);

  useEffect(() => {
    setIsTimeValid(true);
  }, [startTime, endTime]);

  useEffect(() => {
    setIsValid(isTestValid && (scheduleLater || (isDateValid && isTimeValid)));
  }, [isTimeValid, scheduleLater, isDateValid, isTestValid]);

  useEffect(() => {
    if (scheduleLater) {
      if (!isTimeValid) setIsTestValid(true);
      if (!isDateValid) setIsDateValid(true);
    }
  }, [scheduleLater, isDateValid, isTimeValid]);

  const submitHandler = (e) => {
    if (isSubmitting) {
      e.preventDefault();
      return;
    }

    if (isValid) {
      setIsSubmitting(true);
    }

    if (!isValid) {
      console.log(isTestValid, isDateValid, isTimeValid);
      e.preventDefault();
    }

    if (!(testName || testDescription)) {
      setIsTestValid(false);
    }

    if (!scheduleLater) {
      if (!(startDate || endDate)) {
        setIsDateValid(false);
      }
    }
  };

  /*   console.log(
    "time\n",
    isTimeValid,
    "\ndate\n",
    isDateValid,
    isTestValid && (scheduleLater || (isTimeValid && isDateValid))
  ); */
=======
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
>>>>>>> origin/main

  return (
    <AnimatePresence>
      <motion.main
<<<<<<< HEAD
        initial={{ x: "100%" }}
=======
        initial={{ x: "100%", transition: { duration: 0.3 } }}
>>>>>>> origin/main
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
<<<<<<< HEAD
            name="TestName"
=======
            name="testName"
>>>>>>> origin/main
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
<<<<<<< HEAD
            name="TestDescription"
=======
            name="testDescription"
>>>>>>> origin/main
            id="testDescription"
            value={testDescription}
            onChange={(e) => setTestDescription(e.target.value)}
            className="w-full border-[1.2px]  _text-start border-black h-[2.2rem] p-2"
          />
<<<<<<< HEAD

          <div className="mt-4">
            <label>
              <input
                type="checkbox"
                className="me-2"
                onChange={(e) => {
                  setScheduleLater(e.target.checked);
                }}
              />
              I'll Schedule later
            </label>
            {!scheduleLater && (
              <div className="flex justify-between">
                <div className="w-full sm:w-[8rem] flex flex-col">
                  <label htmlFor="startTime" className="block p-1">
                    Start Time
                  </label>
                  <input
                    type="time"
                    name="TestStartTime"
                    id="startTime"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="border border-black text-left h-10 px-3"
                  />
                </div>
                <div className="w-full sm:w-[8rem] flex flex-col">
                  <label htmlFor="endTime" className="block p-1">
                    End Time
                  </label>
                  <input
                    type="time"
                    name="TestEndTime"
                    id="endTime"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="border border-black text-left h-10 px-3"
                  />
                </div>

                <div className="w-full sm:w-[10rem] flex flex-col">
                  <label htmlFor="startDate" className="block p-1">
                    Start Date
                  </label>
                  <input
                    type="date"
                    name="TestStartDate"
                    id="startDate"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="border border-black h-10 text-left px-3"
                  />
                </div>
                <div className="w-full sm:w-[10rem] flex flex-col">
                  <label htmlFor="endDate" className="block p-1">
                    End Date
                  </label>
                  <input
                    type="date"
                    name="TestEndDate"
                    id="endDate"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="border border-black text-left h-10 px-3"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Warning message for invalid fields */}

          <div className="mt-3">
            {isDateValid === false && (
              <p className="text-red-500 text-sm mt-1 text-center">
                Invalid date range
              </p>
            )}
            {isTestValid === false && (
              <p className="text-red-500 text-sm mt-1 text-center">
                Test name and description are required
              </p>
            )}
          </div>

          <button
            onClick={submitHandler}
            className="px-8 py-2 mx-auto mt-4 bg-green-300 hover:bg-green-400"
          >
            {isSubmitting ? "Loading..." : "Schedule Assessment"}
=======
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
>>>>>>> origin/main
          </button>
        </Form>
      </motion.main>
    </AnimatePresence>
  );
}

export default ScheduleTime;

<<<<<<< HEAD
export async function action({ request, params }) {
  console.log("action");
  const url = new URL(request.url);

  const queryTestID =
    url.searchParams.get("TestID") === "undefined"
      ? 0
      : url.searchParams.get("TestID");

  const formData = await request.formData();
  const TestName = formData.get("TestName");
  const TestDescription = formData.get("TestDescription");
  let TestStartDate = formData.get("TestStartDate");
  let TestEndDate = formData.get("TestEndDate");
  const TestStartTime = formData.get("TestStartTime");
  const TestEndTime = formData.get("TestEndTime");

  console.log({
    data: {
      TestID: queryTestID,
      TestName,
      TestDescription,
      TestStartDate,
      TestEndDate,
      TestStartTime,
      TestEndTime,
    },
  });

  const res = await axios.post("https://www.nareshit.net/updateTest", {
    data: {
      TestID: queryTestID,
      TestName,
      TestDescription,
      TestStartDate,
      TestEndDate,
      TestStartTime,
      TestEndTime,
    },
  });
=======
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
>>>>>>> origin/main

  console.log(res);

  return 1;
}
