import React, { useContext, useEffect, useState } from "react";
import QuestionViewFixedCtx from "../context/questionViewFixed";
import { Questions } from "../pages/QuestionView";
import { NavLink } from "react-router-dom";
import Pagination from "./Pagination";

const TOTALPAGINATIONS = 5;

function QuestionViewFixedEasy({
  questions,
  setCurrentPage,
  onPaginationChange,
}) {
  const [currentPagination, setCurrentPagination] = useState(1);

  function onPageChange(flag) {
    if (currentPagination < TOTALPAGINATIONS && flag) {
      setCurrentPagination((prev) => prev + 1);
    } else if (currentPagination > 1 && !flag)
      setCurrentPagination((prev) => prev - 1);
  }

  useEffect(() => {
    onPaginationChange("easy", currentPagination);
  }, [currentPagination]);

  if (questions.length === 0) return <h1>Loading...</h1>;

  return (
    <main>
      <div>
        <div className="border-b-4 border-gray-200">
          <Questions questions={questions} />
        </div>
        <Pagination
          currentPage={currentPagination}
          totalPages={TOTALPAGINATIONS}
          onPageChange={onPageChange}
        />
      </div>
      <div className=" grid p-5 place-content-center">
        <button
          onClick={() => setCurrentPage("medium")}
          className="bg-green-300 px-5 py-2"
        >
          Continue
        </button>
      </div>
    </main>
  );
}

export default QuestionViewFixedEasy;
