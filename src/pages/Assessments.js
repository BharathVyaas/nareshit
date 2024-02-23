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

  // LoaderData
  const { easyCount, mediumCount, hardCount } = useLoaderData();

  const shouldChangeStorage = useRef({ current: true });

  const [warn, setWarn] = useState(false);

  const [assessment, setAssessment] = useState();
  const [difficultyLevel, setDifficlutyLevel] = useState();

  useEffect(() => {
    if (shouldChangeStorage?.current?.value || !LocalStorage?.assessmentPage) {
      if (difficultyLevel) {
        LocalStorage.assessmentPage = {
          ...difficultyLevel,
        };

        shouldChangeStorage.current.value = false;
      }
    }
  }, []);

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
  }, []);

  const handler = (questionType, level, handler) => {
    setDifficlutyLevel((prev) => {
      const newObj = { ...prev };
      newObj[questionType][level] = handler;

      return newObj;
    });
    console.log(difficultyLevel);
  };

  return (
    <AnimatePresence>
      <motion.main
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
      </motion.main>
    </AnimatePresence>
  );
}

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
  } catch (err) {}

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

  const TechnologyID = url.searchParams.get("TechnologyID") || 0;

  const res = await axios.post(
    "https://www.nareshit.net/FetchAvailableQuestionsByCount",
    {
      TechnologyId: TechnologyID,
    }
  );

  console.log(res);

  return {
    easyCount: res?.data?.dbresult[0]?.EasyCount || 0,
    mediumCount: res?.data?.dbresult[0]?.MediumCount || 0,
    hardCount: res?.data?.dbresult[0]?.HardCount || 0,
  };
}
