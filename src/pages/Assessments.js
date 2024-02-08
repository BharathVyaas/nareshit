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
      </motion.main>
    </AnimatePresence>
  );
}

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

  /* const res = await axios.post(
    "https://www.nareshit.net/createTestAssessment",
    {
      data: requestData,
    }
  );

  console.log("res", res); */

  return redirect("/categories/questionview");
}
