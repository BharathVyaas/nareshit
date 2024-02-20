import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Form,
  Navigate,
  redirect,
  useLocation,
  useNavigate,
} from "react-router-dom";

import { SelectTechnologyService } from "../services/technologyService";
import AssessmentService, { MCQService } from "../services/assessmentsService";
import QuestionTypes from "../components/QuestionTypes";
import Button from "../ui/Button";

import { AnimatePresence, motion } from "framer-motion";
import { LocalStorage } from "../services/LocalStorage";
import BuilderService from "../services/builder";
import axios from "axios";
import AuthCtx from "../context/auth.context";
import QuestionTypesV2 from "../components/assessments/QuestionTypes";
import AssessmentsNext from "../components/assessments/AssessmentsNext";

function Assessments() {
  const { isLoggedIn } = useContext(AuthCtx);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) navigate("/login?page=/categories/assessments");
  }, []);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const queryEasy = queryParams.get("easy");
  const queryMedium = queryParams.get("medium");
  const queryHard = queryParams.get("hard");
  const queryTotal = queryEasy + queryMedium + queryHard;

  BuilderService.assessmentService = AssessmentService;
  const [totalQuestions, setTotalQuestions] = useState(
    BuilderService?.assessmentService?.options?.MCQ?.totalQuestions || 0
  );
  const [MCQ, setMCQ] = useState(
    BuilderService?.assessmentService?.options?.MCQ?.flag || false
  );
  const [MCQQuestions, setMCQQuestions] = useState(
    BuilderService?.assessmentService?.options?.MCQ?.totalQuestions || 0
  );
  const [MCQDifficulty, setMCQDifficulty] = useState({
    easy:
      BuilderService?.assessmentService?.options?.MCQ?.difficulty?.easy || 0,
    medium:
      BuilderService?.assessmentService?.options?.MCQ?.difficulty?.medium || 0,
    hard:
      BuilderService?.assessmentService?.options?.MCQ?.difficulty?.hard || 0,
  });

  useEffect(() => {
    console.log("testid", BuilderService.id.testId);
  }, []);

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

  const [linkDisabled, setLinkDisabled] = useState(
    MCQQuestions !==
      Object.values(MCQDifficulty).reduce((item, acc) => item + acc, 0)
  );

  function handler(e) {
    let total = 0;

    for (const key in MCQDifficulty) {
      total += MCQDifficulty[key];
    }

    if (total !== MCQQuestions || total === 0) {
      e.preventDefault();
      setLinkDisabled(true);
      console.log(total, MCQQuestions);
    }
  }

  return (
    <AnimatePresence>
      <motion.main
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
                queryEasy={queryEasy}
                queryMedium={queryMedium}
                queryHard={queryHard}
                queryTotal={queryTotal}
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
          <div className="h-20 relative">
            {linkDisabled && (
              <p className="text-red-900 font-bold text-center -top-8 px-14  absolute w-full">
                Sum(Easy+Medium+Hard) must match Number of Questions.
              </p>
            )}

            <div className="w-full flex mt-14">
              <button
                onClick={handler}
                className={`
                inline-block px-14 py-2 mx-auto mt-3 bg-green-300 hover:bg-green-400`}
              >
                Next
              </button>
            </div>
          </div>
          {/* <Button disabled={linkDisabled} link="/categories/questionview" /> */}
        </Form>
      </motion.main>
    </AnimatePresence>
  );
}

export default Assessments;

export async function action({}, navigate) {
  console.log(BuilderService.id.technology);
  const requestData = {};
  requestData["TestID"] = BuilderService.id.testId || 0;
  requestData["TestDetailsID"] = BuilderService.id.testDetailsId || 0;
  // Question Id static 1
  requestData["QuestionTypeID"] = 1;
  requestData["NumOfEasy"] =
    LocalStorage?.data?.assessmentData?.MCQ?.difficulty?.easy;
  requestData["NumOfMedium"] =
    LocalStorage?.data?.assessmentData?.MCQ.difficulty.medium;
  requestData["NumOfHard"] =
    LocalStorage?.data?.assessmentData?.MCQ?.difficulty?.hard;
  requestData["CreatedBy"] = "Admin";
  requestData["ModifiedBy"] = "Admin";

  console.log("data", requestData);

  const res = await axios.post(
    "https://www.nareshit.net/createTestAssessment",
    {
      data: requestData,
    }
  );

  BuilderService.id.testId = res.data.data[0].TestID;
  BuilderService.id.testDetailsId = res.data.data[0].TestDetailsID;

  console.log("res", res);

  return redirect("/categories/questionview");
}

export function AssessmentsV2() {
  const shouldChangeStorage = useRef({ current: true });

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
    const res = LocalStorage.assessmentPage || {
      MCQ: { Easy: 0, Medium: 0, Hard: 0 },
    };

    const keys = Object.keys(res);
    const difficultyLevels = res;

    setAssessment(keys);
    setDifficlutyLevel(difficultyLevels);
  }, []);

  const handler = (questionType, level, handler) => {
    setDifficlutyLevel((prev) => {
      const newObj = { ...prev };
      newObj[questionType][level] = Number(handler);

      return newObj;
    });
    console.log(difficultyLevel);
  };

  return (
    <div className="bg-gray-50 min-h-[70vh] p-2">
      <Form method="POST" className="ps-3">
        <p className="p-5">Selected Technology: DOTNET</p>
        {/**  Question type */}
        <QuestionTypesV2
          handler={handler}
          assessment={assessment}
          difficultyLevels={difficultyLevel}
        />

        <AssessmentsNext />
      </Form>
    </div>
  );
}

export async function AssessmentActionV2({ request, params }) {
  const formData = await request.formData();

  const TestID = BuilderService.id.testDetailsId || 0;
  const TestDetailsID = BuilderService.id.testDetailsId || 0;

  const QuestionTypeID = formData.get("QuestionTypeID") || 1;
  const NumOfEasy = formData.get("NumOfEasy") || 0;
  const NumOfMedium = formData.get("NumOfMedium") || 0;
  const NumOfHard = formData.get("NumOfHard") || 0;

  const CreatedBy = "Admin";
  const ModifiedBy = "Admin";

  let res;

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

  return 1;
}
