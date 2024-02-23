import React, { useState } from "react";
import { useNavigate } from "react-router";

function QuestionViewNext({ isFormValid, errMsg, TestID }) {
  const [displayErr, setDisplayErr] = useState("");
  const navigate = useNavigate();

  const clickHandler = (e) => {
    if (!isFormValid) {
      setDisplayErr(errMsg || "Must Select A Valid Technology");
      e.preventDefault();
    } else {
      setDisplayErr("");
      let navVar = `/categories/scheduletime?TestID=${TestID}`;
      navigate(navVar);
    }
  };

  return (
    <div className="h-20 relative">
      {displayErr && (
        <p className="text-red-900 font-bold text-center -top-8 px-14  absolute w-full">
          {displayErr}
        </p>
      )}
      <div className="w-full flex mt-14" onClick={clickHandler}>
        <button
          onClick={clickHandler}
          className={`inline-block px-14 py-2 mx-auto mt-3 bg-green-300 hover:bg-green-400`}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default QuestionViewNext;
