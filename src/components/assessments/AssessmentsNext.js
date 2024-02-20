import React from "react";

export function AssessmentsNext() {
  return (
    <div className="h-20 relative">
      <p className="text-red-900 font-bold text-center -top-8 px-14  absolute w-full"></p>

      <div className="w-full flex mt-14">
        <button
          className={`inline-block px-14 py-2 mx-auto mt-3 bg-green-300 hover:bg-green-400`}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default AssessmentsNext;
