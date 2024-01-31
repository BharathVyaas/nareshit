import React, { useEffect, useState } from "react";
import { Form, Link } from "react-router-dom";

import { SelectTechnology } from "../services/technologyService";
import AssessmentService, {
  CodingService,
  FreeTextService,
  MCQService,
} from "../services/assessmentsService";

function Assessments() {
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [MCQ, setMCQ] = useState(false);
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
    console.log(AssessmentService.options);
  }, [codingDifficulty]);

  return (
    <div className="p-2">
      <h1>Selected Technology Name: {SelectTechnology.programmingLanguage}</h1>
      <Form method="POST" className="p-5">
        <fieldset>
          <legend>Types of Questions:</legend>
          <label htmlFor={"totalQuestions"}>
            No. Of Questions:
            <input
              className="bg-white ms-4 w-6 scrollHide border-[1px] border-gray-400 rounded"
              id={"totalQuestions"}
              name={"totalQuestions"}
              type="number"
              value={totalQuestions}
              onChange={(e) => setTotalQuestions(e.target.value)}
            />
          </label>
          <div className="p-5">
            <label htmlFor={"mcq"}>
              <input
                className="bg-white ms-4 w-6 scrollHide border-[1px] border-gray-400 rounded"
                id={"mcq"}
                name={"mcq"}
                type="checkbox"
                value={MCQ}
                onClick={() => setMCQ((prev) => !prev)}
              />
              mcq
            </label>

            {MCQ && (
              <section className="p-5">
                <label htmlFor="mcqNo.Q">
                  Number of Questions:
                  <input
                    className="bg-white ms-4 w-6 scrollHide border-[1px] border-gray-400 rounded"
                    type="number"
                    name="No.Q-secondary"
                    value={MCQQuestions}
                    onChange={(e) => setMCQQuestions(e.target.value)}
                  />
                </label>
                <fieldset>
                  <legend>Difficulty Levels:</legend>
                  <label htmlFor="mcqEasy">
                    Easy:
                    <input
                      className="bg-white ms-4 w-6 scrollHide border-[1px] border-gray-400 rounded"
                      type="number"
                      id="mcqEasy"
                      name="mcqEasy"
                      value={MCQDifficulty.easy}
                      onChange={(e) =>
                        setMCQDifficulty((prev) => {
                          return { ...prev, easy: e.target.value };
                        })
                      }
                    />
                  </label>
                  <label>
                    Medium:
                    <input
                      className="bg-white ms-4 w-6 scrollHide border-[1px] border-gray-400 rounded"
                      type="number"
                      id="mcqMedium"
                      name="mcqMedium"
                      value={MCQDifficulty.medium}
                      onChange={(e) =>
                        setMCQDifficulty((prev) => {
                          return { ...prev, medium: e.target.value };
                        })
                      }
                    />
                  </label>
                  <label>
                    Hard:
                    <input
                      className="bg-white ms-4 w-6 scrollHide border-[1px] border-gray-400 rounded"
                      type="number"
                      id="mcqHard"
                      name="mcqHard"
                      value={MCQDifficulty.hard}
                      onChange={(e) =>
                        setMCQDifficulty((prev) => {
                          return { ...prev, hard: e.target.value };
                        })
                      }
                    />
                  </label>
                </fieldset>
              </section>
            )}
          </div>
          <div className="p-5">
            <label htmlFor={"freeText"}>
              <input
                className="bg-white ms-4 w-6 scrollHide border-[1px] border-gray-400 rounded"
                id={"freeText"}
                name={"freeText"}
                type="checkbox"
                value={freeText}
                onClick={() => setFreeText((prev) => !prev)}
              />
              freeText
            </label>

            {freeText && (
              <section className="p-5">
                <label htmlFor="freeTextNo.Q">
                  Number of Questions:
                  <input
                    className="bg-white ms-4 w-6 scrollHide border-[1px] border-gray-400 rounded"
                    type="number"
                    name="No.Q-secondary"
                    value={freeTextQuestions}
                    onChange={(e) => setFreeTextQuestions(e.target.value)}
                  />
                </label>
                <fieldset>
                  <legend>Difficulty Levels:</legend>
                  <label htmlFor="">
                    Easy:
                    <input
                      className="bg-white ms-4 w-6 scrollHide border-[1px] border-gray-400 rounded"
                      type="number"
                      id="freeTextEasy"
                      name="freeTextEasy"
                      value={freeTextDifficulty.easy}
                      onChange={(e) =>
                        setFreeTextDifficulty((prev) => {
                          return { ...prev, easy: e.target.value };
                        })
                      }
                    />
                  </label>
                  <label>
                    Medium:
                    <input
                      className="bg-white ms-4 w-6 scrollHide border-[1px] border-gray-400 rounded"
                      type="number"
                      id="freeTextMedium"
                      name="freeTextMedium"
                      value={freeTextDifficulty.medium}
                      onChange={(e) =>
                        setFreeTextDifficulty((prev) => {
                          return { ...prev, medium: e.target.value };
                        })
                      }
                    />
                  </label>
                  <label>
                    Hard:
                    <input
                      className="bg-white ms-4 w-6 scrollHide border-[1px] border-gray-400 rounded"
                      type="number"
                      id="freeTextHard"
                      name="freeTextHard"
                      value={freeTextDifficulty.hard}
                      onChange={(e) =>
                        setFreeTextDifficulty((prev) => {
                          return { ...prev, hard: e.target.value };
                        })
                      }
                    />
                  </label>
                </fieldset>
              </section>
            )}
          </div>
          <div className="p-5">
            <label htmlFor="coding">
              <input
                className="bg-white ms-4 w-6 scrollHide border-[1px] border-gray-400 rounded"
                id="coding"
                name="coding"
                type="checkbox"
                value={coding}
                onClick={() => setcoding((prev) => !prev)}
              />
              coding
            </label>

            {coding && (
              <section className="p-5">
                <label htmlFor="No.Q">
                  Number of Questions:
                  <input
                    className="bg-white ms-4 w-6 scrollHide border-[1px] border-gray-400 rounded"
                    id="No.Q-main"
                    type="number"
                    value={codingQuestions}
                    onChange={(e) => setcodingQuestions(e.target.value)}
                  />
                </label>
                <fieldset>
                  <legend>Difficulty Levels:</legend>
                  <label htmlFor="">
                    Easy:
                    <input
                      className="bg-white ms-4 w-6 scrollHide border-[1px] border-gray-400 rounded"
                      type="number"
                      id="codingEasy"
                      name="codingEasy"
                      value={codingDifficulty.easy}
                      onChange={(e) =>
                        setcodingDifficulty((prev) => {
                          return { ...prev, easy: e.target.value };
                        })
                      }
                    />
                  </label>
                  <label>
                    Medium:
                    <input
                      className="bg-white ms-4 w-6 scrollHide border-[1px] border-gray-400 rounded"
                      type="number"
                      id="codingMedium"
                      name="codingMedium"
                      value={codingDifficulty.medium}
                      onChange={(e) =>
                        setcodingDifficulty((prev) => {
                          return { ...prev, medium: e.target.value };
                        })
                      }
                    />
                  </label>
                  <label>
                    Hard:
                    <input
                      className="bg-white ms-4 w-6 scrollHide border-[1px] border-gray-400 rounded"
                      type="number"
                      id="codingHard"
                      name="codingHard"
                      value={codingDifficulty.hard}
                      onChange={(e) =>
                        setcodingDifficulty((prev) => {
                          return { ...prev, hard: e.target.value };
                        })
                      }
                    />
                  </label>
                </fieldset>
              </section>
            )}
          </div>
        </fieldset>

        <Link to="/categories/questionview">Next</Link>
      </Form>
    </div>
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
