import React, { useContext, useEffect, useState } from "react";
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
  return (
    <Form>
      {/**  Question type */}
      <div>
        <label htmlFor="QuestionTypeID">
          <input
            className="bg-white ms-4 w-6 scrollHide border-[1px] border-gray-400 rounded"
            id="QuestionTypeID"
            name="QuestionTypeID"
            type="checkbox"
            value="1"
            checked
            disabled
          />
          MCQ
        </label>
      </div>

      {/**  Difficulty Levels */}
      <div>
        <p>DifficultyLevel</p>
        {/* easy */}
        <div>
          <label htmlFor="NumOfEasy">Easy:</label>
          <input
            className="bg-white ms-2 me-4 w-16 scrollHide border-[1px] border-gray-400 rounded"
            type="number"
            id="NumOfEasy"
            name="NumOfEasy"
            defaultValue="0"
          />
        </div>

        {/* medium */}
        <div>
          <label htmlFor="NumOfMedium">Medium:</label>
          <input
            className="bg-white ms-2 me-4 w-16 scrollHide border-[1px] border-gray-400 rounded"
            type="number"
            id="NumOfMedium"
            name="NumOfMedium"
            defaultValue="0"
          />
        </div>

        {/* hard */}
        <div>
          <label htmlFor="NumOfHard">Hard:</label>
          <input
            className="bg-white ms-2 me-4 w-16 scrollHide border-[1px] border-gray-400 rounded"
            type="number"
            id="NumOfHard"
            name="NumOfHard"
            defaultValue="0"
          />
        </div>
      </div>
    </Form>
  );
}
