import React, { useContext, useEffect, useState } from "react";
import { Form, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import axios from "axios";
import AuthCtx from "../context/auth.context";

function ScheduleTime() {
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(AuthCtx);

  
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const TestID = queryParams.get("TestID");

  useEffect(() => {
    if (!isLoggedIn) navigate("/login?page=/categories/scheduletime");
  }, [isLoggedIn, navigate]);

  const [testName, setTestName] = useState("");
  const [testDescription, setTestDescription] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  const [scheduleLater, setScheduleLater] = useState(false);

  const [isValid, setIsValid] = useState(false);
  const [isDateValid, setIsDateValid] = useState();
  const [isTimeValid, setIsTimeValid] = useState(true);
  const [isTestValid, setIsTestValid] = useState();
  const [state, setState] = useState('pending')

  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchHandler = async () => {
    const res = await axios.post("https://www.nareshit.net/RetriveTestSchedule", { "TestId":TestID})
    console.log(res.data.dbresult[0])

    if(res.data && res.data.dbresult && res.data.dbresult[0]){
      let sDate = res.data.dbresult[0].TestStartDate ? new Date(res.data.dbresult[0].TestStartDate).toISOString().split('T')[0] : ''
      let eDate = res.data.dbresult[0].TestEndDate ? new Date(res.data.dbresult[0].TestEndDate).toISOString().split('T')[0] : ''

      let sTime = res.data.dbresult[0].TestStartTime ? new Date(res.data.dbresult[0].TestStartTime).toTimeString().split(' ')[0] : '';
      let eTime = res.data.dbresult[0].TestEndTime ? new Date(res.data.dbresult[0].TestEndTime).toTimeString().split(' ')[0] : '';

      setTestName(res.data.dbresult[0].TestName || '')
      setTestDescription(res.data.dbresult[0].TestDescription || '')
      setStartDate(sDate || null)
      setEndDate(eDate || null)
      setStartTime(sTime)
      setEndTime(eTime) 
    }
  }

  useEffect(() => {fetchHandler()}, [])

  useEffect(() => {
    if (startDate && endDate) {
     setIsDateValid(new Date(startTime +' '+ startDate).getTime() <
      new Date(endTime + ' ' + endDate).getTime() && new Date().getTime() < new Date(startDate + ' ' + startTime).getTime());
    }
  }, [startDate, endDate, startTime, endTime]);

  useEffect(() => {
    setIsTestValid(testName);
  }, [testName, testDescription]);

  useEffect(() => {    
    setIsTimeValid(startTime && endTime);
  }, [startTime, endTime]);

  useEffect(() => {
    setIsValid(isTestValid && (scheduleLater || (isDateValid && isTimeValid)) && new Date(startTime +' '+ startDate).getTime() <
    new Date(endTime + ' ' + endDate).getTime());

      
    if(startDate) setIsDateValid(new Date(startTime +' '+ startDate).getTime() <
    new Date(endTime + ' ' + endDate).getTime() && new Date().getTime() < new Date(startDate + ' ' + startTime).getTime());
  }, [isTimeValid, scheduleLater, isDateValid, isTestValid]);

  useEffect(() => {
    if (scheduleLater) {
       setIsTestValid(true);
       setIsDateValid(true);
    }
  }, [scheduleLater, isDateValid, isTimeValid]);

  const submitHandler = (e) => {

    if (isSubmitting) {
      e.preventDefault();
      return;
    }
console.log(scheduleLater)
    if(scheduleLater){
      e.preventDefault();
      if(testDescription){
        console.log('_action')
        if(!isSubmitting){
          setIsSubmitting(true)
          action_()
        }
      }else{
        setIsTestValid(false)
      }
    }else{
      console.log('isValid', isValid)
    if (isValid) {
      setIsSubmitting(true);
      action_()
      console.log('action_')
    }

    if (!isValid) {
      console.log(isTestValid, isDateValid, isTimeValid);
      e.preventDefault();
      return;
    }

    if (!(testName || testDescription)) {
      setIsTestValid(false);
    }

    if (!scheduleLater) {
      if (!(startDate || endDate)) {
        setIsDateValid(false);
      }
    }

    e.preventDefault()
  }}

  const action_ = async () => {

  const queryTestID = TestID

  const TestName = testName;
  const TestDescription = testDescription;
  let TestStartDate = startDate;
  let TestEndDate = endDate;
  const TestStartTime = startTime
  const TestEndTime = endTime;

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
  setState('resloved')
  console.log(res, 'resloved');
  }

  useEffect(() => {
    if(state === 'resloved'){
      window.alert('Test Has been created successfully')
      navigate('/categories/assessmentlist')
    }
  }, [state])

  /*   console.log(
    "time\n",
    isTimeValid,
    "\ndate\n",
    isDateValid,
    isTestValid && (scheduleLater || (isTimeValid && isDateValid))
  ); */

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
          disabled
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
          </button>
        </Form>
      </motion.main>
    </AnimatePresence>
  );
}

export default ScheduleTime;

export async function action({ request, params }) {
  
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

  console.log(res, 'from action');

  return 1;
}
