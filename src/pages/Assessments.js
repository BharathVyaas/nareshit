<<<<<<< HEAD
import React, { useEffect, useRef, useState } from "react";
import { Form, redirect, useLoaderData, useLocation } from "react-router-dom";
import { LocalStorage } from "../services/LocalStorage";
import axios from "axios";
import QuestionTypesV2 from "../components/assessments/QuestionTypes";
import AssessmentsNext from "../components/assessments/AssessmentsNext";
import { AnimatePresence, motion } from "framer-motion";

export function AssessmentsV2() {
  /**
   *
   * Default Data
   */
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const TestID = queryParams.get("TestID") || 0;
  const NumOfEasy =
    queryParams.get("NumOfEasy") === "undefined"
      ? 0
      : queryParams.get("NumOfEasy");
  const NumOfMedium =
    queryParams.get("NumOfMedium") === "undefined"
      ? 0
      : queryParams.get("NumOfMedium");
  const NumOfHard =
    queryParams.get("NumOfHard") === "undefined"
      ? 0
      : queryParams.get("NumOfHard");
  const [queryTotal, setQueryTotal] = useState(
    Number(NumOfEasy) + Number(NumOfMedium) + Number(NumOfHard)
  );

  // LoaderData
  const { easyCount, mediumCount, hardCount } = useLoaderData();

  const shouldChangeStorage = useRef({ current: true });

  const [warn, setWarn] = useState(false);

  const [assessment, setAssessment] = useState();
  const [difficultyLevel, setDifficlutyLevel] = useState();
  const [currentTotal, setCurrentTotal] = useState(
    Number(NumOfEasy) + Number(NumOfMedium) + Number(NumOfHard)
  );

  useEffect(() => {
    const fetchCounts = async () => {
      const res = await axios.post(
        "https://www.nareshit.net/getBasicTestDetailsInfo",
        {
          data: { TestID: TestID },
        }
      );

      console.log("getBasicTestDetailsInfo response:", res);

      let NumOfEasy = res.data.data[0]?.NumOfEasy || 0;
      let NumOfMedium = res.data.data[0]?.NumOfMedium || 0;
      let NumOfHard = res.data.data[0]?.NumOfHard || 0;

      setQueryTotal(
        Number(NumOfEasy) + Number(NumOfMedium) + Number(NumOfHard)
      );

      setDifficlutyLevel({
        MCQ: {
          Easy: NumOfEasy,
          Medium: NumOfMedium,
          Hard: NumOfHard,
        },
      });

      setCurrentTotal(
        Number(NumOfEasy) + Number(NumOfMedium) + Number(NumOfHard)
      );
    };

    fetchCounts();
  }, [TestID]);

  useEffect(() => {
    if (shouldChangeStorage?.current?.value || !LocalStorage?.assessmentPage) {
      if (difficultyLevel) {
        LocalStorage.assessmentPage = {
          ...difficultyLevel,
        };

        shouldChangeStorage.current.value = false;
      }
    }
  }, [difficultyLevel]);

  useEffect(() => {
    if (difficultyLevel) {
      LocalStorage.assessmentPage = {
        ...difficultyLevel,
      };
    }
  }, [difficultyLevel]);

  useEffect(() => {
    const res = {
      MCQ: {
        Easy: NumOfEasy || 0,
        Medium: NumOfMedium || 0,
        Hard: NumOfHard || 0,
      },
    };

    const keys = Object.keys(res);
    const difficultyLevels = res;

    setAssessment(keys);
    setDifficlutyLevel(difficultyLevels);
  }, [NumOfEasy, NumOfMedium, NumOfHard]);

  const handler = (questionType, level, handler) => {
    setDifficlutyLevel((prev) => {
      const newObj = { ...prev };
      newObj[questionType][level] = handler;

      return newObj;
    });
  };
=======
import React, { useEffect, useState } from "react";
import { Form, Navigate, redirect, useNavigate } from "react-router-dom";

import { SelectTechnologyService } from "../services/technologyService";
import AssessmentService, { MCQService } from "../services/assessmentsService";
import QuestionTypes from "../components/QuestionTypes";
import Button from "../ui/Button";

import { AnimatePresence, motion } from "framer-motion";
import { LocalStorage } from "../services/LocalStorage";
import BuilderService from "../services/builder";
import axios from "axios";

function Assessments() {
  const [totalQuestions, setTotalQuestions] = useState(
    BuilderService.assessmentService.options.MCQ.totalQuestions
  );
  const [MCQ, setMCQ] = useState(
    BuilderService.assessmentService.options.MCQ.flag
  );
  const [MCQQuestions, setMCQQuestions] = useState(
    BuilderService.assessmentService.options.MCQ.totalQuestions
  );
  const [MCQDifficulty, setMCQDifficulty] = useState({
    easy: BuilderService.assessmentService.options.MCQ.difficulty.easy,
    medium: BuilderService.assessmentService.options.MCQ.difficulty.medium,
    hard: BuilderService.assessmentService.options.MCQ.difficulty.hard,
  });

  useEffect(() => {
    AssessmentService.updateTotalQuestionCount(totalQuestions);
    LocalStorage.data = BuilderService.getData();
  }, [totalQuestions]);

  useEffect(() => {
    AssessmentService.insertOptions("MCQ", {
      key: "flag",
      value: MCQService.updateFlag(MCQ).getFlag(),
    });

    LocalStorage.data = BuilderService.getData();
  }, [MCQ]);

  useEffect(() => {
    AssessmentService.insertOptions("MCQ", {
      key: "totalQuestions",
      value: MCQService.updateTotalQuestionCount(
        Number(MCQQuestions)
      ).getTotalQuestionCount(),
    });
    LocalStorage.data = BuilderService.getData();
  }, [MCQQuestions]);

  useEffect(() => {
    AssessmentService.insertOptions("MCQ", {
      key: "difficulty",
      value: MCQService.updateDifficulty(MCQDifficulty).getDifficulty(),
    });
    LocalStorage.data = BuilderService.getData();
  }, [MCQDifficulty]);

  const linkDisabled =
    MCQQuestions !==
    Object.values(MCQDifficulty).reduce((item, acc) => item + acc, 0);
>>>>>>> origin/main

  return (
    <AnimatePresence>
      <motion.main
<<<<<<< HEAD
        initial={{ x: "100%" }}
        animate={{ x: 0, transition: { duration: 0.3 } }}
        exit={{ x: "-100%", transition: { duration: 0.3 } }}
      >
        <div className="bg-gray-50 min-h-[70vh] p-2">
          <Form method="POST" className="ps-3">
            <p className="p-5">Selected Technology: DOTNET</p>
            {/**  Question type */}
            <QuestionTypesV2
              handler={handler}
              assessment={assessment}
              easyCount={easyCount}
              mediumCount={mediumCount}
              hardCount={hardCount}
              queryTotal={queryTotal}
              currentTotal={currentTotal}
              setCurrentTotal={setCurrentTotal}
              difficultyLevels={difficultyLevel}
              warn={warn}
              setWarn={setWarn}
            />

            <AssessmentsNext
              assessment={assessment}
              warn={warn}
              setWarn={setWarn}
              difficultyLevel={difficultyLevel}
            />
          </Form>
        </div>
=======
        initial={{ x: "100%", transition: { duration: 0.3 } }}
        animate={{ x: 0, transition: { duration: 0.3 } }}
        exit={{ x: "100%", transition: { duration: 0.3 } }}
        className="bg-gray-50 min-h-[70vh] p-2"
      >
        <h1>
          Selected Technology Name:
          <span className="ps-3">
            {SelectTechnologyService.programmingLanguage}
          </span>
        </h1>
        <Form method="POST" className="p-5">
          <fieldset className="">
            <div className="p-5">
              <QuestionTypes
                questionType="mcq"
                data={MCQ}
                setData={setMCQ}
                dataQuestions={MCQQuestions}
                setDataQuestions={setMCQQuestions}
                dataDifficulty={MCQDifficulty}
                setDataDifficulty={setMCQDifficulty}
              />
            </div>
          </fieldset>
          <div className="w-full flex mt-14">
            <button
              disabled={linkDisabled}
              className={`${
                linkDisabled && "disabled"
              } inline-block px-14 py-2 mx-auto mt-3 bg-green-300 hover:bg-green-400`}
            >
              Submit
            </button>
          </div>
          {/* <Button disabled={linkDisabled} link="/categories/questionview" /> */}
        </Form>
>>>>>>> origin/main
      </motion.main>
    </AnimatePresence>
  );
}

<<<<<<< HEAD
export async function AssessmentActionV2({ request }) {
  const formData = await request.formData();

  const url = new URL(request.url);

  const TestID = url.searchParams.get("TestID") || 0;
  let TestDetailsID = url.searchParams.get("TestDetailsID") || 0;
  const TechnologyID = url.searchParams.get("TechnologyID") || 0;
  const TechnologyName = url.searchParams.get("TechnologyName") || 0;

  const QuestionTypeID = formData.get("QuestionTypeID") || 1;
  const NumOfEasy = formData.get("NumOfEasy") || 0;
  const NumOfMedium = formData.get("NumOfMedium") || 0;
  const NumOfHard = formData.get("NumOfHard") || 0;

  const CreatedBy = "Admin";
  const ModifiedBy = "Admin";

  let res;

  console.log("data", TestID, request);

  try {
    res = await axios.post("https://www.nareshit.net/createTestAssessment", {
      data: {
        TestID,
        TestDetailsID,
        QuestionTypeID,
        NumOfEasy,
        NumOfMedium,
        NumOfHard,
        CreatedBy,
        ModifiedBy,
      },
    });
  } catch (err) {
    console.log(
      "err",
      "url",
      "https://www.nareshit.net/createTestAssessment",
      "error",
      err
    );
  }

  console.log(
    "url",
    "https://www.nareshit.net/createTestAssessment",
    "req",
    {
      TestID,
      TestDetailsID,
      QuestionTypeID,
      NumOfEasy,
      NumOfMedium,
      NumOfHard,
      CreatedBy,
      ModifiedBy,
    },
    "res",
    res
  );

  console.log(TestDetailsID);

  res = await axios.post("https://www.nareshit.net/getBasicTestDetailsInfo", {
    data: { TestID },
  });

  TestDetailsID = res.data?.data[0]?.TestDetailsID;
  const EasyCount = res.data?.data[0]?.NumOfEasy || 0;
  const MediumCount = res.data?.data[0]?.NumOfMedium || 0;
  const HardCount = res.data?.data[0]?.NumOfHard || 0;

  console.log(res);

  let redirectVar = `/categories/questionview?edit=false&TechnologyID=${TechnologyID}&TechnologyName=${TechnologyName}&easy=${EasyCount}&medium=${MediumCount}&hard=${HardCount}`;

  if (TestID) {
    redirectVar = `/categories/questionview?edit=true&TestID=${TestID}&TechnologyName=${TechnologyName}&TestDetailsID=${TestDetailsID}&TechnologyID=${TechnologyID}&easy=${EasyCount}&medium=${MediumCount}&hard=${HardCount}`;
  }

  return redirect(redirectVar);
}

export async function AssessmentLoaderV2({ request }) {
  const url = new URL(request.url);

  const TestID = url.searchParams.get("TestID") || 0;
  const TechnologyID = url.searchParams.get("TechnologyID") || 0;

  const res = await axios.post(
    "https://www.nareshit.net/FetchAvailableQuestionsByCount",
    {
      TestId: TestID,
      TechnologyId: TechnologyID,
    }
  );

  console.log(res);

  return {
    easyCount: res?.data?.dbresult[0]?.EasyCount || 0,
    mediumCount: res?.data?.dbresult[0]?.MediumCount || 0,
    hardCount: res?.data?.dbresult[0]?.HardCount || 0,
  };
=======
export default Assessments;

export async function action({}, navigate) {
  const requestData = {};
  console.log(BuilderService);
  requestData["TestID"] = BuilderService.id.technology;
  requestData["TestDetailsID"] = 0;
  requestData["QuestionTypeID"] = 1;
  requestData["NumOfEasy"] =
    LocalStorage.data.assessmentData.MCQ.difficulty.easy;
  requestData["NumOfMedium"] =
    LocalStorage.data.assessmentData.MCQ.difficulty.medium;
  requestData["NumOfHard"] =
    LocalStorage.data.assessmentData.MCQ.difficulty.hard;
  requestData["CreatedBy"] = "Admin";
  requestData["ModifiedBy"] = "Admin";

  console.log(requestData);

  console.log(requestData);
  const res = await axios.post(
    "https://www.nareshit.net/createTestAssessment",
    {
      data: requestData,
    }
  );

  console.log("res", res);

  return redirect("/categories/questionview");
>>>>>>> origin/main
}
