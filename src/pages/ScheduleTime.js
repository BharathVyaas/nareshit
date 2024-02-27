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

  const [testName, setTestName] = useState("");
  const [testDescription, setTestDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

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

      const isStartDateValid = startDateObj >= today;
      const isEndDateValid = startDateObj <= endDateObj;

      setIsDateValid(isStartDateValid && isEndDateValid);
    }
  }, [startDate, endDate]);

  useEffect(() => {
    setIsTestValid(testName);
  }, [testName, testDescription]);

  useEffect(() => {
    setIsTimeValid(true);
  }, [startTime, endTime]);

  useEffect(() => {
    setIsValid(isTestValid && isDateValid && isTimeValid);
  }, [isTimeValid, isDateValid, isTestValid]);

  const submitHandler = (e) => {
    if (isSubmitting) {
      e.preventDefault();
      return;
    }

    if (isValid) {
      console.log("yes");
      setIsSubmitting(true);
    }

    if (!isValid) {
      console.log(isTestValid, isDateValid, isTimeValid);
      e.preventDefault();
    }

    if (!(testName || testDescription)) {
      setIsTestValid(false);
    }
    if (!(startDate || endDate)) {
      setIsDateValid(false);
    }
  };

  console.log(
    "time\n",
    isTimeValid,
    "\ndate\n",
    isDateValid,
    isTestValid && isTimeValid && isDateValid
  );

  return (
    <AnimatePresence>
      <motion.main
        initial={{ x: "100%" }}
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
            name="TestName"
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
            name="TestDescription"
            id="testDescription"
            value={testDescription}
            onChange={(e) => setTestDescription(e.target.value)}
            className="w-full border-[1.2px]  _text-start border-black h-[2.2rem] p-2"
          />

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
            {isSubmitting ? "Loading..." : "Test Prepared"}
          </button>
        </Form>
      </motion.main>
    </AnimatePresence>
  );
}

export default ScheduleTime;

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

  console.log(res);

  return 1;
}
