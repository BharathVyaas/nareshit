import React from "react";

export function AssessmentsNext({
  assessment,
  difficultyLevel,
  warn,
  setWarn,
}) {
  let easy = difficultyLevel?.[assessment]?.Easy == 0;
  let medium = difficultyLevel?.[assessment]?.Medium == 0;
  let hard = difficultyLevel?.[assessment]?.Hard == 0;

  if (easy == undefined) easy = true;
  if (medium == undefined) medium = true;
  if (hard == undefined) hard = true;

  let disabled = easy && medium && hard;

  return (
    <>
      <div className="relative">
        <div className="flex flex-col align-center">
          {warn && (
            <p className="width-full text-center text-red-600 font-semibold mb-3">
              {disabled
                ? "Total Questins must be grater then 0"
                : "Total Questions must match easy + medium + hard"}
            </p>
          )}
          <p className="text-center w-full">
            <span className="text-yellow-600 font-semibold">Yellow </span> Color
            indicates total available questions in database
          </p>
        </div>
        <p className="text-red-900 font-bold text-center -top-8 px-14  absolute w-full"></p>

        <div className="w-full flex">
          <button
            disabled={disabled || warn}
            className={`inline-block px-14 py-2 mx-auto mt-3 bg-green-300 hover:bg-green-400`}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}

export default AssessmentsNext;
