import React, { useState } from "react";
import { redirect, useNavigate } from "react-router";

function QuestionViewNext({ isFormValid, errMsg, TestID, isTableTotalValid }) {
  const [displayErr, setDisplayErr] = useState("");
  const navigate = useNavigate();

  const clickHandler = (e) => {
    // if user did not select all questions.
    if (!isTableTotalValid) {
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
  };

  const previewHandler = () => {
    window.location.href = `https://www.nareshit.net/previewexampage?testID=${TestID}`;
  };

  return (
    <div className="h-20 relative">
      {displayErr && (
        <p className="text-red-900 font-bold text-center -top-8 px-14  absolute w-full">
          {displayErr}
        </p>
      )}
      <div className="flex w-full">
        <div className="mx-auto">
          <button
            onClick={previewHandler}
            className={`inline-block px-14 py-2 mx-auto mt-3 bg-green-300 hover:bg-green-400`}
          >
            Preview
          </button>
        </div>
        <div className="mx-auto" onClick={clickHandler}>
          <button
            className={`inline-block px-14 py-2 mx-auto mt-3 bg-green-300 hover:bg-green-400`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default QuestionViewNext;
