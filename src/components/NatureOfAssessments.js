import React from "react";
<<<<<<< HEAD
<<<<<<< HEAD
import BuilderService from "../services/builder";

function NatureOfAssessments({
  nature,
  setNature,
  editNatureId,
  setFixedDisabled,
}) {
=======

function NatureOfAssessments({ nature, setNature }) {
>>>>>>> origin/main
=======
import BuilderService from "../services/builder";

function NatureOfAssessments({
  nature,
  setNature,
  editNatureId,
  setFixedDisabled,
}) {
>>>>>>> origin/master
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
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> origin/master
            onChange={(e) => {
              setFixedDisabled(false);
              setNature(e.target.value);
            }}
<<<<<<< HEAD
          />
          <span className="p-2">Dynamic</span>
        </label>
        <label className="p-5">
          <input
            type="radio"
            name="assessmentNature"
            checked={nature === "fixed" || editNatureId === "fixed"}
            value="fixed"
            onChange={(e) => {
              setFixedDisabled(true);
              setNature(e.target.value);
            }}
          />
          <span className="p-2">Fixed</span>
        </label>
        <label className="p-5">
          <input
            type="radio"
            name="assessmentNature"
            checked={nature === "fastTrack" || editNatureId === "fastTrack"}
            value="fastTrack"
            onChange={(e) => {
              setFixedDisabled(false);
              setNature(e.target.value);
            }}
=======
            onChange={(e) => setNature(e.target.value)}
=======
>>>>>>> origin/master
          />
          <span className="p-2">Dynamic</span>
        </label>
        <label className="p-5">
          <input
            type="radio"
            name="assessmentNature"
            checked={nature === "fixed" || editNatureId === "fixed"}
            value="fixed"
            onChange={(e) => {
              setFixedDisabled(true);
              setNature(e.target.value);
            }}
          />
          <span className="p-2">Fixed</span>
        </label>
        <label className="p-5">
          <input
            type="radio"
            name="assessmentNature"
            checked={nature === "fastTrack" || editNatureId === "fastTrack"}
            value="fastTrack"
<<<<<<< HEAD
            onChange={(e) => setNature(e.target.value)}
>>>>>>> origin/main
=======
            onChange={(e) => {
              setFixedDisabled(false);
              setNature(e.target.value);
            }}
>>>>>>> origin/master
          />
          <span className="p-2">Fast Track</span>
        </label>
      </div>
    </fieldset>
  );
}

export default NatureOfAssessments;
