import React, { useEffect, useState } from "react";
import { Form } from "react-router-dom";

import { SelectTechnologyService } from "../services/technologyService";
import AssessmentService, { MCQService } from "../services/assessmentsService";
import QuestionTypes from "../components/QuestionTypes";
import Button from "../ui/Button";

import { AnimatePresence, motion } from "framer-motion";
import { LocalStorage } from "../services/LocalStorage";
import BuilderService from "../services/builder";

function Assessments() {
  console.log("assess", BuilderService.assessmentService);

  console.log("assess2", BuilderService.assessmentService.options);
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
    console.log(BuilderService.getData());
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

  return (
    <AnimatePresence>
      <motion.main
        initial={{ x: "100%", transition: { duration: 0.3 } }}
        animate={{ x: 0, transition: { duration: 0.3 } }}
        exit={{ x: "100%", transition: { duration: 0.3 } }}
        className="bg-gray-50 min-h-[70vh] p-2"
      >
        <h1>
          Selected Technology Name:{" "}
          {SelectTechnologyService.programmingLanguage}
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
          <Button link="/categories/questionview" />
        </Form>
      </motion.main>
    </AnimatePresence>
  );
}

export default Assessments;

export async function action({ request }) {
  const formData = await request.formData();

  const requestValue = {};

  formData.forEach((value, key) => {
    requestValue[key] = value;
  });

  return 1;
}
