import React from "react";

function NatureOfAssessments({ nature, setNature }) {
  return (
    <fieldset className="mx-4">
      <legend>Nature of Assessment:</legend>
      <div className="mt-2 mb-5">
        <label className="p-5">
          <input
            type="radio"
            name="assessmentNature"
            value="dynamic"
            checked={nature === "dynamic"}
            onChange={(e) => setNature(e.target.value)}
          />
          <span className="p-2">Dynamic</span>
        </label>
        <label>
          <input
            disabled
            type="radio"
            name="assessmentNature"
            checked={nature === "fixed"}
            value="fixed"
            onChange={(e) => setNature(e.target.value)}
          />
          <span className="p-2">Fixed</span>
        </label>
        <label>
          <input
            disabled
            type="radio"
            name="assessmentNature"
            checked={nature === "fastTrack"}
            value="fastTrack"
            onChange={(e) => setNature(e.target.value)}
          />
          <span className="p-2">Fast Track</span>
        </label>
      </div>
    </fieldset>
  );
}

export default NatureOfAssessments;
