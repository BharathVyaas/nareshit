import React, { useEffect, useState } from "react";
import { redirect, useNavigate } from "react-router";

function QuestionViewNext({
  isFormValid,
  errMsg,
  TestID,
  isTableTotalValid,
  combination,
  natureID,
}) {
  const [displayErr, setDisplayErr] = useState("");
  const navigate = useNavigate();
  const [isAgreed, setIsAgreed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tableTotal, setTableTotal] = useState({ easy: 0, medium: 0, hard: 0 });

  useEffect(() => {
    if (combination) {
      Object.values(combination).forEach((ele) => {
        // if Nature is not dynamic
        if (natureID == 2) {
          const includesObj = ele.includes;

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
        if (natureID == 1) {
          let totalTableEasy = 0;
          let totalTableMedium = 0;
          let totalTableHard = 0;
          Object.values(combination).forEach((ele) => {
            totalTableEasy += ele?.easy || 0;
            totalTableMedium += ele?.medium || 0;
            totalTableHard += ele?.hard || 0;
          });
          console.log(tableTotal, totalTableEasy);
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
    console.log(combination);
  }, [combination]);

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

  const previewHandler = () => {
    window.location.href = `https://www.nareshit.net/previewexampage?testID=${TestID}`;
  };

  return (
    (tableTotal.easy != 0 ||
      tableTotal.medium != 0 ||
      tableTotal.hard != 0) && (
      <div className="h-20 relative">
        {displayErr && (
          <p className="text-red-900 font-bold text-center -top-8 px-14  absolute w-full">
            {displayErr}
          </p>
        )}
        <div className="flex w-full">
          {!isTableTotalValid && (
            <div className="mx-auto">
              <button
                onClick={previewHandler}
                className={`inline-block px-14 py-2 mx-auto mt-3 bg-green-300 hover:bg-green-400`}
              >
                Preview
              </button>
            </div>
          )}
          {isTableTotalValid && (
            <div className="mx-auto grid place-content-center">
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

              <div className="mx-auto" onClick={clickHandler}>
                <button
                  className={`inline-block px-14 py-2 mx-auto mt-3 bg-green-300 hover:bg-green-400`}
                >
                  {isSubmitting ? "Loading..." : "Next"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  );
}

export default QuestionViewNext;
