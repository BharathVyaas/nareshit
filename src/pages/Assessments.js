import React, { useEffect, useState } from "react";
import { Form } from "react-router-dom";

import { SelectTechnology } from "../services/technologyService";
import AssessmentService, {
  CodingService,
  FreeTextService,
  MCQService,
} from "../services/assessmentsService";
import QuestionTypes, { NumberOfQuestions } from "../components/QuestionTypes";
import Button from "../ui/Button";

import { AnimatePresence, motion } from "framer-motion";

function Assessments() {
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [MCQ, setMCQ] = useState(true);
  const [MCQQuestions, setMCQQuestions] = useState(0);
  const [MCQDifficulty, setMCQDifficulty] = useState({
    easy: 0,
    medium: 0,
    hard: 0,
  });
  const [freeText, setFreeText] = useState(false);
  const [freeTextQuestions, setFreeTextQuestions] = useState(0);
  const [freeTextDifficulty, setFreeTextDifficulty] = useState({
    easy: 0,
    medium: 0,
    hard: 0,
  });
  const [coding, setcoding] = useState(false);
  const [codingQuestions, setcodingQuestions] = useState(0);
  const [codingDifficulty, setcodingDifficulty] = useState({
    easy: 0,
    medium: 0,
    hard: 0,
  });

  useEffect(() => {
    AssessmentService.updateTotalQuestionCount(totalQuestions);
  }, [totalQuestions]);

  useEffect(() => {
    AssessmentService.insertOptions("MCQ", {
      key: "flag",
      value: MCQService.updateFlag(MCQ).getFlag(),
    });
  }, [MCQ]);

  useEffect(() => {
    AssessmentService.insertOptions("MCQ", {
      key: "totalQuestions",
      value: MCQService.updateTotalQuestionCount(
        Number(MCQQuestions)
      ).getTotalQuestionCount(),
    });
  }, [MCQQuestions]);

  useEffect(() => {
    AssessmentService.insertOptions("MCQ", {
      key: "difficulty",
      value: MCQService.updateDifficulty(MCQDifficulty).getDifficulty(),
    });
  }, [MCQDifficulty]);

  useEffect(() => {
    AssessmentService.insertOptions("freeText", {
      key: "flag",
      value: FreeTextService.updateFlag(freeText).getFlag(),
    });
  }, [freeText]);

  useEffect(() => {
    AssessmentService.insertOptions("freeText", {
      key: "totalQuestions",
      value: FreeTextService.updateTotalQuestionCount(
        Number(freeTextQuestions)
      ).getTotalQuestionCount(),
    });
  }, [freeTextQuestions]);

  useEffect(() => {
    AssessmentService.insertOptions("freeText", {
      key: "difficulty",
      value:
        FreeTextService.updateDifficulty(freeTextDifficulty).getDifficulty(),
    });
  }, [freeTextDifficulty]);

  useEffect(() => {
    AssessmentService.insertOptions("coding", {
      key: "flag",
      value: CodingService.updateFlag(coding).getFlag(),
    });
  }, [coding]);

  useEffect(() => {
    AssessmentService.insertOptions("coding", {
      key: "totalQuestions",
      value: CodingService.updateTotalQuestionCount(
        Number(codingQuestions)
      ).getTotalQuestionCount(),
    });
  }, [codingQuestions]);

  useEffect(() => {
    AssessmentService.insertOptions("coding", {
      key: "difficulty",
      value: CodingService.updateDifficulty(codingDifficulty).getDifficulty(),
    });
  }, [codingDifficulty]);

  return (
    <AnimatePresence>
      <motion.main
        initial={{ x: "100%", transition: { duration: 0.3 } }}
        animate={{ x: 0, transition: { duration: 0.3 } }}
        exit={{ x: "100%", transition: { duration: 0.3 } }}
        className="bg-gray-50 min-h-[70vh] p-2"
      >
        <h1>
          Selected Technology Name: {SelectTechnology.programmingLanguage}
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
