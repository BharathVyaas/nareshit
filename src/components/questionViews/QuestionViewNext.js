import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";

function QuestionViewNext({
  isFormValid,
  errMsg,
  TestID,
  isTableTotalValid,
  combination,
  natureID,
}) {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const TestDetailsID = queryParams.get("TestDetailsID");
  const TechnologyName = queryParams.get("TechnologyName");
  const TechnologyID = queryParams.get("TechnologyID");

  const [displayErr, setDisplayErr] = useState("");
  const navigate = useNavigate();
  const [isAgreed, setIsAgreed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tableTotal, setTableTotal] = useState({ easy: 0, medium: 0, hard: 0 });

  useEffect(() => {
    if (combination) {
      Object.values(combination).forEach((ele) => {
        // if Nature is not dynamic
        if (Number(natureID) === 2) {
          for (let key in ele.includes) {
            const value = ele.includes[key];

            if (key === "easy") {
              setTableTotal((prev) => {
                if (!prev) return prev;
                const obj = { ...prev };
                obj.easy += value?.count || 0;
                return obj;
              });
            }
            if (key === "medium") {
              setTableTotal((prev) => {
                if (!prev) return prev;
                const obj = { ...prev };
                obj.medium += value?.count || 0;
                return obj;
              });
            }
            if (key === "hard") {
              setTableTotal((prev) => {
                if (!prev) return prev;
                const obj = { ...prev };
                obj.hard += value?.count || 0;
                return obj;
              });
            }
          }
        }
        if (Number(natureID) === 1) {
          let totalTableEasy = 0;
          let totalTableMedium = 0;
          let totalTableHard = 0;
          Object.values(combination).forEach((ele) => {
            totalTableEasy += ele?.easy || 0;
            totalTableMedium += ele?.medium || 0;
            totalTableHard += ele?.hard || 0;
          });

          setTableTotal((prev) => {
            if (!prev) return prev;
            let obj = { ...prev };

            obj.easy = totalTableEasy;
            obj.medium = totalTableMedium;
            obj.hard = totalTableHard;

            return obj;
          });
        }
      });
    }
  }, [combination, natureID]);

  const clickHandler = (e) => {
    // if user did not select all questions.
    if (!isTableTotalValid || !isAgreed) {
      e.preventDefault();
    } else {
      if (!isFormValid) {
        setDisplayErr(errMsg || "Must Select A Valid Technology");
        e.preventDefault();
      } else {
        setDisplayErr("");
        let navVar = `/categories/scheduletime?TestID=${TestID}`;
        navigate(navVar);
      }
    }
    if (isTableTotalValid && isAgreed) {
      setIsSubmitting(true);
      e.preventDefault();
    }
  };

  const previewHandler = async () => {
    const res = await axios.post(
      "https://www.nareshit.net/UpdateCombinations",
      {
        data: [
          ...Object.values(combination).map((ele) => {
            return {
              EasyCount: ele?.easy || 0,
              MediumCount: ele?.medium || 0,
              HardCount: ele?.hard || 0,
              ModuleId: ele?.ModuleID || null,
              TopicId: ele?.TopicID || null,
              SubtopicId: ele?.SubTopicID || null,
              TechnologyName: TechnologyName || null,
              TechnologyId: TechnologyID || null,
              ModuleName: ele?.selectedModule || null,
              TopicName: ele?.selectedTopic || null,
              SubtopicName: ele?.selectedSubTopic || null,
              TestDetailsID: TestDetailsID || 0,
              TestID: TestID || 0,
            };
          }),
        ],
      }
    );

    console.log(
      "url",
      "https://www.nareshit.net/UpdateCombinations",
      "data",
      {
        data: [
          ...Object.values(combination).map((ele) => {
            return {
              EasyCount: ele?.easy || 0,
              MediumCount: ele?.medium || 0,
              HardCount: ele?.hard || 0,
              ModuleId: ele?.ModuleID || null,
              TopicId: ele?.TopicID || null,
              SubtopicId: ele?.SubTopicID || null,
              TechnologyName: TechnologyName || null,
              TechnologyId: TechnologyID || null,
              ModuleName: ele?.selectedModule || null,
              TopicName: ele?.selectedTopic || null,
              SubtopicName: ele?.selectedSubTopic || null,
              TestDetailsID: TestDetailsID || 0,
              TestID: TestID || 0,
            };
          }),
        ],
      },
      "res",
      res
    );

    console.log(combination);

    const postCombinations = async () => {
      await axios.post(
        "https://www.nareshit.net/Insert_Update_QuestionCombination",
        {
          TestId: TestID,
          TestDetailsId: TestDetailsID,
          Combinations: JSON.stringify(combination),
        }
      );
    };

    if (Object.keys(combination).length > 0) postCombinations();

    const final_preview_res = await axios.post(
      "https://www.nareshit.net/Final_Preview",
      { TestID: TestID, BatchID: 1, MappingStudents: null }
    );

    console.log('url', "https://www.nareshit.net/Final_Preview", 'data', { TestID: TestID, BatchID: 1, MappingStudents: null }, 'res',final_preview_res);

    const transactionID =
      final_preview_res?.data?.dbresult?.[0]?.TransactionId || 0;

    window.location.href = `https://www.nareshit.net/previewexampage?testID=${TestID}&transactionId=${transactionID}`;
  };

  return (
    
      <div className="h-20 relative">
        {displayErr && (
          <p className="text-red-900 font-bold text-center -top-8 px-14  absolute w-full">
            {displayErr}
          </p>
        )}
        <div className="flex flex-col w-full mt-5">
          {isTableTotalValid && (
            <label
              className="flex items-center space-x-2 mx-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <input
                type="checkbox"
                className="me-2"
                onChange={(e) => setIsAgreed(e.target.checked)}
              />
              <span>I agreed I choose all questions correctly</span>
            </label>
          )}

          <div className="flex justify-center">
            {isTableTotalValid && (
              <div className="me-6">
                <button
                  onClick={previewHandler}
                  className={`inline-block w-40 py-2 mx-auto mt-3 bg-green-300 hover:bg-green-400`}
                >
                  Preview
                </button>
              </div>
            )}

            {isTableTotalValid && isAgreed ? (
              <div className="" onClick={clickHandler}>
                <button
                  className={`inline-block w-40 py-2 mx-auto mt-3 bg-green-300 hover:bg-green-400`}
                >
                  {isSubmitting ? "Loading..." : "Next"}
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    )
}

export default QuestionViewNext;


/**
 * 
 * 
 * import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";

function QuestionViewNext({
  isFormValid,
  errMsg,
  TestID,
  isTableTotalValid,
  combination,
  natureID,
}) {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const TestDetailsID = queryParams.get("TestDetailsID");
  const TechnologyName = queryParams.get("TechnologyName");
  const TechnologyID = queryParams.get("TechnologyID");

  const [displayErr, setDisplayErr] = useState("");
  const navigate = useNavigate();
  const [isAgreed, setIsAgreed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tableTotal, setTableTotal] = useState({ easy: 0, medium: 0, hard: 0 });

  useEffect(() => {
    if (combination) {
      Object.values(combination).forEach((ele) => {
        // if Nature is not dynamic
        if (Number(natureID) === 2) {
          for (let key in ele.includes) {
            const value = ele.includes[key];

            if (key === "easy") {
              setTableTotal((prev) => {
                if (!prev) return prev;
                const obj = { ...prev };
                obj.easy += value?.count || 0;
                return obj;
              });
            }
            if (key === "medium") {
              setTableTotal((prev) => {
                if (!prev) return prev;
                const obj = { ...prev };
                obj.medium += value?.count || 0;
                return obj;
              });
            }
            if (key === "hard") {
              setTableTotal((prev) => {
                if (!prev) return prev;
                const obj = { ...prev };
                obj.hard += value?.count || 0;
                return obj;
              });
            }
          }
        }
        if (Number(natureID) === 1) {
          let totalTableEasy = 0;
          let totalTableMedium = 0;
          let totalTableHard = 0;
          Object.values(combination).forEach((ele) => {
            totalTableEasy += ele?.easy || 0;
            totalTableMedium += ele?.medium || 0;
            totalTableHard += ele?.hard || 0;
          });

          setTableTotal((prev) => {
            if (!prev) return prev;
            let obj = { ...prev };

            obj.easy = totalTableEasy;
            obj.medium = totalTableMedium;
            obj.hard = totalTableHard;

            return obj;
          });
        }
      });
    }
  }, [combination, natureID]);

  const clickHandler = (e) => {
    // if user did not select all questions.
    if (!isTableTotalValid || !isAgreed) {
      e.preventDefault();
    } else {
      if (!isFormValid) {
        setDisplayErr(errMsg || "Must Select A Valid Technology");
        e.preventDefault();
      } else {
        setDisplayErr("");
        let navVar = `/categories/scheduletime?TestID=${TestID}`;
        navigate(navVar);
      }
    }
    if (isTableTotalValid && isAgreed) {
      setIsSubmitting(true);
      e.preventDefault();
    }
  };

  const previewHandler = async () => {
    const res = await axios.post(
      "https://www.nareshit.net/UpdateCombinations",
      {
        data: [
          ...Object.values(combination).map((ele) => {
            return {
              EasyCount: ele?.easy || 0,
              MediumCount: ele?.medium || 0,
              HardCount: ele?.hard || 0,
              ModuleId: ele?.ModuleID || null,
              TopicId: ele?.TopicID || null,
              SubtopicId: ele?.SubTopicID || null,
              TechnologyName: TechnologyName || null,
              TechnologyId: TechnologyID || null,
              ModuleName: ele?.selectedModule || null,
              TopicName: ele?.selectedTopic || null,
              SubtopicName: ele?.selectedSubTopic || null,
              TestDetailsID: TestDetailsID || 0,
              TestID: TestID || 0,
            };
          }),
        ],
      }
    );

    console.log(
      "url",
      "https://www.nareshit.net/UpdateCombinations",
      "data",
      {
        data: [
          ...Object.values(combination).map((ele) => {
            return {
              EasyCount: ele?.easy || 0,
              MediumCount: ele?.medium || 0,
              HardCount: ele?.hard || 0,
              ModuleId: ele?.ModuleID || null,
              TopicId: ele?.TopicID || null,
              SubtopicId: ele?.SubTopicID || null,
              TechnologyName: TechnologyName || null,
              TechnologyId: TechnologyID || null,
              ModuleName: ele?.selectedModule || null,
              TopicName: ele?.selectedTopic || null,
              SubtopicName: ele?.selectedSubTopic || null,
              TestDetailsID: TestDetailsID || 0,
              TestID: TestID || 0,
            };
          }),
        ],
      },
      "res",
      res
    );

    console.log(combination);

    const postCombinations = async () => {
      await axios.post(
        "https://www.nareshit.net/Insert_Update_QuestionCombination",
        {
          TestId: TestID,
          TestDetailsId: TestDetailsID,
          Combinations: JSON.stringify(combination),
        }
      );
    };

    if (Object.keys(combination).length > 0) postCombinations();

    const final_preview_res = await axios.post(
      "https://www.nareshit.net/Final_Preview",
      { TestID: TestID, BatchID: 1, MappingStudents: null }
    );

    console.log(final_preview_res);

    const transactionID =
      final_preview_res?.data?.dbresult?.[0]?.TransactionId || 0;

    window.location.href = `https://www.nareshit.net/previewexampage?testID=${TestID}&transactionId=${transactionID}`;
  };

  return (
    (Number(tableTotal.easy) !== 0 ||
      Number(tableTotal.medium) !== 0 ||
      Number(tableTotal.hard) !== 0) && (
      <div className="h-20 relative">
        {displayErr && (
          <p className="text-red-900 font-bold text-center -top-8 px-14  absolute w-full">
            {displayErr}
          </p>
        )}
        <div className="flex flex-col w-full mt-5">
          {isTableTotalValid && (
            <label
              className="flex items-center space-x-2 mx-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <input
                type="checkbox"
                className="me-2"
                onChange={(e) => setIsAgreed(e.target.checked)}
              />
              <span>I agreed I choose all questions correctly</span>
            </label>
          )}

          <div className="flex justify-center">
            {isTableTotalValid && (
              <div className="me-6">
                <button
                  onClick={previewHandler}
                  className={`inline-block w-40 py-2 mx-auto mt-3 bg-green-300 hover:bg-green-400`}
                >
                  Preview
                </button>
              </div>
            )}

            {isTableTotalValid && isAgreed ? (
              <div className="" onClick={clickHandler}>
                <button
                  className={`inline-block w-40 py-2 mx-auto mt-3 bg-green-300 hover:bg-green-400`}
                >
                  {isSubmitting ? "Loading..." : "Next"}
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    )
  );
}

export default QuestionViewNext;

 */